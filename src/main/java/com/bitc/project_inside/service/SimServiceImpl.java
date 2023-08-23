package com.bitc.project_inside.service;


import com.bitc.project_inside.data.DTO.PersonRequest;
import com.bitc.project_inside.data.entity.AlarmEntity;
import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.data.entity.ProjectEntity;
import com.bitc.project_inside.data.entity.TodoEntity;
import com.bitc.project_inside.data.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SimServiceImpl implements SimService{

    private final PersonRepository personRepository;
    private final AlarmRepository alarmRepository;
    private final InquiryRepository inquiryRepository;
    private final ProjectRepository projectRepository;
    private final TodoRepository todoRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${app.upload-profile-dir}")
    private String uploadDir;
    @Override
    public int isUser(String email) throws Exception {

        return personRepository.countByPersonId(email);
    }

    @Override
    public int isNick(String nickName) throws Exception {
        return personRepository.countByPersonNickName(nickName);
    }

    @Override
    public void insertPerson(PersonEntity person) throws Exception {
        personRepository.save(person);
    }

    @Override
    public void makeAlarm(String alarmToPerson, String alarmContent, String alarmFromPerson, String alarmFrom) throws Exception {

        AlarmEntity alarmEntity = new AlarmEntity(alarmToPerson, alarmContent, alarmFromPerson, alarmFrom);
        alarmRepository.save(alarmEntity);
    }

    @Override
    public List<AlarmEntity> getAlarmList(String alarmToPerson) throws Exception {
        return alarmRepository.findByAlarmToPersonOrderByAlarmIdxDesc(alarmToPerson);
    }

    @Override
    @Transactional
    public void readAlarmList(String alarmToPerson) throws Exception {
        alarmRepository.readAlarmList(alarmToPerson);
    }

    @Override
    @Transactional
    public void readAlarm(int alarmIdx) throws Exception {
        alarmRepository.readAlarm(alarmIdx);
    }

    @Override
    @Transactional
    public void inquiryAnswer(int inquiryIdx, String inquiryAnswer) throws Exception {
        inquiryRepository.inquiryAnswer(inquiryIdx, inquiryAnswer);
    }

    @Override
    public List<PersonEntity> getPersonList() throws Exception {
        return personRepository.findAllPerson();
    }

    @Override
    public List<ProjectEntity> getProjectList() throws Exception {
        return projectRepository.findAllByOrderByProjectDateDesc();
    }

    @Override
    public String personProfileImg(MultipartFile personProfileImg) throws Exception {

        String profileImgName = personProfileImg.getOriginalFilename();
        String fileExtension = profileImgName.substring(profileImgName.lastIndexOf(".")+1);
        String fileName = System.currentTimeMillis() + "_" + Math.random() + "." + fileExtension;
        String savedImagePath = uploadDir + File.separator + fileName;

        try {
            byte[] imageData = personProfileImg.getBytes();;
            File imageFile = new File(savedImagePath);

            try(FileOutputStream fos = new FileOutputStream(imageFile)){
                fos.write(imageData);
            }

            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }


    }

    @Override
    public List<TodoEntity> getTodoList(int todoMatchingIdx) throws Exception {
        return todoRepository.findByTodoMatchingIdx(todoMatchingIdx);
    }

    @Override
    public void addTodoItem(TodoEntity todoEntity) throws Exception {
        todoRepository.save(todoEntity);
    }

    @Override
    public void editTodoItem(TodoEntity todoEntity) throws Exception {
        todoRepository.save(todoEntity);
    }

    @Override
    public Integer save(PersonEntity person) {
        return personRepository.save(PersonEntity.builder()
                .personId(person.getPersonId())
                .personNickName(person.getPersonNickName())
                .personPassword(bCryptPasswordEncoder.encode(person.getPersonPassword()))
                .build()).getPersonIdx();   // idx 리턴
    }

}
