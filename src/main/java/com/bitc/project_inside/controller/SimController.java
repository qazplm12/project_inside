package com.bitc.project_inside.controller;

import com.bitc.project_inside.data.entity.*;
import com.bitc.project_inside.data.repository.PersonRepository;
import com.bitc.project_inside.service.SimService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/simServer")
public class SimController {

    private final SimService simService;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final PersonRepository personRepository;

    // 계정 관련
    @RequestMapping(value = "/updatePersonInfo", method = RequestMethod.POST)
    public void updatePersonInfo(
            @RequestParam(value = "personId") String personId,
            @RequestParam(value = "personProfileImg", required = false) MultipartFile personProfileImg,
            @RequestParam(value = "personNickName", required = false) String personNickName,
            @RequestParam(value = "personPassword", required = false) String personPassword,
            @RequestParam(value = "personLanguage", required = false) String personLanguage
    ) throws Exception {
        System.out.println("/updatePersonInfo 서버");

        PersonEntity person = simService.getUserInfo(personId);

        if (personProfileImg != null) {
            System.out.println("personProfileImg : " + personProfileImg);
            // 프로필 사진 변경일때

            // 매개변수(파일 경로정보)를 personEntity 에 추가
            // public/image 폴더에 실제 파일 저장하는 과정
            person.setPersonImgPath(simService.personProfileImg(personProfileImg));

        }
        if (personNickName != null) {
            System.out.println("personNickName : " + personNickName);
            person.setPersonNickName(personNickName);
            // 닉네임 변경일때
        }

        if (personPassword != null) {
            System.out.println("personPassword : " + personPassword);
            // 비밀번호 변경일때

            // 매개변수를 personEntity 에 추가
            person.setPersonPasswordUpdateDt(LocalDate.now());
            person.setPersonPassword(passwordEncoder.encode(personPassword));

        }

        if (personLanguage != null) {
            System.out.println("personLanguage : " + personLanguage);
            // 사용언어 변경일때
            person.setPersonLanguage(personLanguage);
        }


        simService.updatePerson(person);
    }

    @RequestMapping(value = "/banningPerson", method = RequestMethod.POST)
    public void banningPerson(
            String personId,
            String personBannedMsg
    ) throws Exception {
        System.out.println("---- /banningPerson 서버 ---- ");

        PersonEntity person = simService.getUserInfo(personId);
        person.setPersonBannedMsg(personBannedMsg);
        personRepository.save(person);
    }

    // 알림 관련
    @RequestMapping(value = "/getAlarmList", method = RequestMethod.POST)
    public List<AlarmEntity> getAlarmList(
            @RequestParam(value = "alarmToPerson") String alarmToPerson
    ) throws Exception {
        System.out.println("--------- /getAlarmList 서버 --------");
        System.out.println("alarmToPerson : " + alarmToPerson);

        return simService.getAlarmList(alarmToPerson);
    }

    @RequestMapping(value = "/readAlarm", method = RequestMethod.POST)
    public void readAlarm(
            @RequestParam(value = "alarmIdx") int alarmIdx
    ) throws Exception {
        System.out.println("--------- /readAlarm 서버 --------");
        System.out.println("alarmToPerson : " + alarmIdx);

        simService.readAlarm(alarmIdx);
    }

    @RequestMapping(value = "/readAlarmList", method = RequestMethod.POST)
    public void readAlarmList(
            @RequestParam(value = "alarmToPerson") String alarmToPerson
    ) throws Exception {
        System.out.println("--------- /readAlarmList 서버 --------");
        System.out.println("alarmToPerson : " + alarmToPerson);

        simService.readAlarmList(alarmToPerson);
    }


    // 문의사항 관련

    @RequestMapping(value = "/getInquiryList", method = RequestMethod.POST)
    public List<InquiryEntity> getInquiryList(
            @RequestParam(value = "personNickName") String personNickName
    ) throws Exception {
        System.out.println("/getInquiryList 서버 : ");

        List<InquiryEntity> inquiryList = simService.getInquiryList(personNickName);
        ;

        return inquiryList;
    }

    @RequestMapping(value = "/sendInquiry", method = RequestMethod.POST)
    public void sendInquiry(
            @RequestParam(value = "personNickName") String personNickName,
            @RequestParam(value = "inquiryTitle") String title,
            @RequestParam(value = "inquiryCategory") int category,
            @RequestParam(value = "inquiryContent") String content
    ) throws Exception {
        System.out.println("/sendInquiry 서버 : ");

        InquiryEntity inquiry = new InquiryEntity();
        inquiry.setInquiryPersonNick(personNickName);
        inquiry.setInquiryTitle(title);
        inquiry.setInquiryCategory(category);
        inquiry.setInquiryContent(content);

        simService.sendInquiry(inquiry);
    }

    @RequestMapping(value = "/updateInquiry", method = RequestMethod.POST)
    public List<InquiryEntity> updateInquiry(
            @RequestParam(value = "inquiryIdx") int idx,
            @RequestParam(value = "personNickName") String personNickName,
            @RequestParam(value = "inquiryContent") String content
    ) throws Exception {
        System.out.println("------ /updateInquiry 서버 ------");

        simService.updateInquiry(idx, content);

        List<InquiryEntity> inquiryList = simService.getInquiryList(personNickName);
        ;

        return inquiryList;
    }


    @RequestMapping(value = "/sendInquiryAnswer", method = RequestMethod.POST)
    public List<InquiryEntity> sendInquiryAnswer(
            @RequestParam(value = "personNickName") String personNickName,
            @RequestParam(value = "inquiryTitle") String inquiryTitle,
            @RequestParam(value = "inquiryIdx") int inquiryIdx,
            @RequestParam(value = "inquiryAnswer") String inquiryAnswer,
            @RequestParam(value = "inquiryPersonNick") String alarmToPerson
    ) throws Exception {
        System.out.println("/sendInquiryAnswer 서버 : " + inquiryAnswer);

        // 답장
        simService.inquiryAnswer(inquiryIdx, inquiryAnswer);

        // 알림
        simService.makeAlarm(alarmToPerson, inquiryTitle, "admin", "inquiry", String.valueOf(inquiryIdx));

        List<InquiryEntity> inquiryList = simService.getInquiryList(personNickName);
        ;

        return inquiryList;
    }


    // 관리자 페이지 관련
    @RequestMapping(value = "/getPersonList", method = RequestMethod.POST)
    public List<PersonEntity> getPersonList() throws Exception {
        System.out.println("--------- /getPersonList 서버 --------");


        return simService.getPersonList();
    }

    // 관리자 페이지 관련
    @RequestMapping(value = "/getChallengeList", method = RequestMethod.POST)
    public List<ChallengeEntity> getChallengeList() throws Exception {
        System.out.println("--------- /getChallengeList 서버 --------");

        return simService.getChallengeList();
    }


    // 메인 페이지 관련
    @RequestMapping(value = "/getProjectList", method = RequestMethod.POST)
    public List<ProjectEntity> getProjectList() throws Exception {
        System.out.println("--------- /getProjectList 서버 --------");

        return simService.getProjectList();
    }

    @RequestMapping(value = "/getChallengeListLatest", method = RequestMethod.POST)
    public List<ChallengeEntity> getChallengeListLatest() throws Exception {
        System.out.println("--------- /getChallengeListLatest 서버 --------");

        return simService.getChallengeListLatest();
    }

    @RequestMapping(value = "/getQuestionListLatest", method = RequestMethod.POST)
    public List<QuestionEntity> getQuestionListLatest() throws Exception {
        System.out.println("--------- /getQuestionListLatest 서버 --------");

        return simService.getQuestionListLatest();
    }

    // 프로젝트 보드 관련
    @RequestMapping(value = "/getTodoList", method = RequestMethod.POST)
    public List<TodoEntity> getTodoList(@RequestParam(value = "todoMatchingIdx") int todoMatchingIdx) throws Exception {
        System.out.println("--------- /getTodoList 서버 --------");


        return simService.getTodoList(todoMatchingIdx);
    }

    @RequestMapping(value = "/addTodoItem", method = RequestMethod.POST)
    public List<TodoEntity> addTodoItem(
            @RequestParam int todoMatchingIdx,
            @RequestParam String todoNickName,
            @RequestParam String todoTitle,
            @RequestParam String todoStatus,
            @RequestParam String todoContent,
            @RequestParam LocalDate todoStartDay,
            @RequestParam LocalDate todoEndDay
    ) throws Exception {
        System.out.println("--------- /addTodoItem 서버 --------");
        TodoEntity todoEntity = new TodoEntity();
        todoEntity.setTodoMatchingIdx(todoMatchingIdx);
        todoEntity.setTodoMemberNick(todoNickName);
        todoEntity.setTodoTitle(todoTitle);
        todoEntity.setTodoStatus(todoStatus);
        todoEntity.setTodoContent(todoContent);
        todoEntity.setTodoStartDate(todoStartDay);
        todoEntity.setTodoEndDate(todoEndDay);

        System.out.println(todoEntity);

        simService.addTodoItem(todoEntity);

        return simService.getTodoList(todoMatchingIdx);
    }

    @RequestMapping(value = "/editTodoItem", method = RequestMethod.POST)
    public List<TodoEntity> editTodoItem(

            @RequestParam int todoIdx,
            @RequestParam int todoMatchingIdx,
            @RequestParam String todoNickName,
            @RequestParam String todoStatus,
            @RequestParam String todoTitle,
            @RequestParam String todoContent,
            @RequestParam LocalDate todoStartDay,
            @RequestParam LocalDate todoEndDay,
            @RequestParam int todoProgress
    ) throws Exception {
        System.out.println("--------- /editTodoItem 서버 --------");
        TodoEntity todoEntity = new TodoEntity();

        todoEntity.setTodoIdx(todoIdx);
        todoEntity.setTodoMatchingIdx(todoMatchingIdx);
        todoEntity.setTodoMemberNick(todoNickName);
        todoEntity.setTodoTitle(todoTitle);
        todoEntity.setTodoStatus(todoStatus);
        todoEntity.setTodoContent(todoContent);
        todoEntity.setTodoStartDate(todoStartDay);
        todoEntity.setTodoEndDate(todoEndDay);
        todoEntity.setTodoProgress(todoProgress);

        System.out.println(todoIdx);
        System.out.println(todoEntity);

        simService.editTodoItem(todoEntity);

        return simService.getTodoList(todoMatchingIdx);
    }

    // 프로젝트 참여 관련(마이페이지)
    @RequestMapping(value = "/getMyProject", method = RequestMethod.POST)
    public List<ProjectEntity> getMyProject(
            @RequestParam(value = "projectLeaderId") String leader
    ) throws Exception {
        System.out.println("--------- /getMyProject 서버 --------");

        return simService.getMyProjectList(leader);
    }

    @RequestMapping(value = "/getJoinProject", method = RequestMethod.POST)
    public List<ProjectEntity> getJoinProject(
            @RequestParam(value = "matchingMemberNick") String member
    ) throws Exception {
        System.out.println("--------- /getJoinProject 서버 --------");

        List<MatchingEntity> myJoinProject = simService.getMyJoinProject(member);

        return simService.getJoinProject(myJoinProject);
    }


    @RequestMapping(value = "/getRequestMembers", method = RequestMethod.POST)
    public List<PersonEntity> getRequestMembers(
            @RequestParam(value = "matchingProjectIdx") int idx
    ) throws Exception {
        System.out.println("--------- /getRequestMembers 서버 --------");
        System.out.println("matchingProjectIdx : " +  idx);
        // 매칭 프로젝트 테이블에서 memberAccept 1이고, idx가 매치되는 유저 리스트 가져오기
        return simService.getMyRequestMembers(idx);
    }

  @RequestMapping(value = "/getMatchingAllList", method = RequestMethod.POST)
    public List<MatchingEntity> getMatchingAllList(
            @RequestParam(value = "matchingProjectIdx") int idx
    ) throws Exception {
        System.out.println("--------- /getMatchingAllList 서버 --------");
        System.out.println("matchingProjectIdx : " +  idx);

        // 매칭 프로젝트 테이블에서 memberAccept 1이고, idx가 매치되는 matchingEntity List
        return simService.getMatchingAllList(idx);
    }
@RequestMapping(value = "/getMatchingList", method = RequestMethod.POST)
    public List<MatchingEntity> getMatchingList(
            @RequestParam(value = "matchingProjectIdx") int idx
    ) throws Exception {
        System.out.println("--------- /getMatchingList 서버 --------");
        System.out.println("matchingProjectIdx : " +  idx);

        return simService.getMatchingList(idx);
    }


  @RequestMapping(value = "/memberAccept", method = RequestMethod.POST)
    public void memberAccept(
            @RequestParam(value = "matchingIdx") int idx
    ) throws Exception {
        System.out.println("--------- /memberAccept 서버 --------");
        System.out.println("matchingIdx : " +  idx);

        simService.memberAccept(idx);
    }


  @RequestMapping(value = "/memberReject", method = RequestMethod.POST)
    public void memberReject(
            @RequestParam(value = "matchingIdx") int idx
    ) throws Exception {
        System.out.println("--------- /memberReject 서버 --------");
        System.out.println("matchingIdx : " +  idx);

      simService.memberReject(idx);
    }


}
