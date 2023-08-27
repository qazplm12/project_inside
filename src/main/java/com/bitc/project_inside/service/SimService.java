package com.bitc.project_inside.service;


import com.bitc.project_inside.data.DTO.AnswerRequest;
import com.bitc.project_inside.data.DTO.QuestionRequest;
import com.bitc.project_inside.data.DTO.SolvedRequest;
import com.bitc.project_inside.data.entity.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface SimService {
    int isUser(String email) throws Exception;

    int isNick(String nickName) throws Exception;

    void insertPerson(PersonEntity person) throws Exception;

    void makeAlarm(String alarmToPerson, String alarmContent, String alarmFromPerson, String alarmFrom, String contentIdx) throws Exception;
    // 알림 생성 매개변수
    // 1. 알림 받는 사람 닉네임
    // 2. 알림내용 (문의제목, 프로젝트명, 알고리즘 문제명)
    // 3. 알림 보내는 사람 닉네임
    // 4. 알림 종류(inquiry, challenge, project
    // 5. 알림 발생시킨 요소의 idx( 링크를 주기 위함)

    List<AlarmEntity> getAlarmList(String alarmToPerson) throws Exception;

    void readAlarmList(String alarmToPerson) throws Exception;

    void readAlarm(int alarmIdx) throws Exception;

    void inquiryAnswer(int inquiryIdx, String inquiryAnswer) throws Exception;

    List<PersonEntity> getPersonList() throws Exception;

    List<ProjectEntity> getProjectList() throws Exception;

    String personProfileImg(MultipartFile personProfileImg) throws Exception;

    List<TodoEntity> getTodoList(int todoMatchingIdx) throws Exception;

    void addTodoItem(TodoEntity todoEntity) throws Exception;

    void editTodoItem(TodoEntity todoEntity) throws Exception;

    PersonEntity getUserInfo(String personId) throws Exception;

    void updatePerson(PersonEntity person) throws Exception;

    int isPassword(String originalPassword, String plainPassword, PasswordEncoder passwordEncoder);

    void sendInquiry(InquiryEntity inquiry) throws Exception;

    List<InquiryEntity> getInquiryList(String personNickName) throws Exception;

    void updateInquiry(int idx, String content) throws Exception;

    List<ChallengeEntity> getChallengeList() throws Exception;

    List<ProjectEntity> getMyProjectList(String leader) throws Exception;

    List<MatchingEntity> getMyJoinProject(String member) throws Exception;

    List<ProjectEntity> getJoinProject(List<MatchingEntity> myJoinProject) throws Exception;

    List<ChallengeEntity> getChallengeListLatest() throws Exception;

    List<QuestionEntity> getQuestionListLatest() throws Exception;

    List<PersonEntity> getMyRequestMembers(int idx) throws Exception;

    List<MatchingEntity> getMatchingList(int idx) throws Exception;

    void memberAccept(int idx) throws Exception;

    void memberReject(int idx) throws Exception;

    List<MatchingEntity> getMatchingAllList(int idx) throws Exception;

    List<MatchingEntity> getMyMatchingList(String memberNick) throws Exception;

    int countJoinMember(int idx) throws Exception;

    void cancelRequest(int idx) throws Exception;

    ProjectEntity getProjectInfo(int projectIdx) throws Exception;

    MatchingEntity getMatchingInfo(int projectIdx, String matchingMemberNick) throws Exception;

    int checkRejectMember(int idx, String nick) throws Exception;

    int countAcceptMember(int idx) throws Exception;

    List<MatchingEntity> getMatchingMembers(int idx) throws Exception;

    Optional<MatchingEntity> isMatchingMember(int idx, String nick) throws Exception;

    List<SolvedEntity> getMySolutionList(String nick) throws Exception;

    List<SolvedRequest> solvedInfoInChallengeInfo(List<SolvedEntity> solvedList) throws Exception;

    List<QuestionEntity> getMyQuestionList(String nick) throws Exception;

    List<QuestionRequest> questionInfoInChallengeInfo(List<QuestionEntity> questionList) throws Exception;

    List<AnswerEntity> getMyAnswerList(String nick) throws Exception;

    List<AnswerRequest> answerInfoInQuestionInfoInChallengeInfo(List<AnswerEntity> answerList) throws Exception;

    List<ProjectEntity> getProjects() throws Exception;

//    Integer save(PersonEntity person);
}
