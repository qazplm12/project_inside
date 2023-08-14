package com.bitc.project_inside.service;


import com.bitc.project_inside.data.entity.AlarmEntity;
import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.data.repository.AlarmRepository;
import com.bitc.project_inside.data.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SimServiceImpl implements SimService{

    private final PersonRepository personRepository;
    private final AlarmRepository alarmRepository;

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

}
