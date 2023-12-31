package com.bitc.project_inside.service;


import com.bitc.project_inside.data.DTO.AnswerRequest;
import com.bitc.project_inside.data.DTO.QuestionRequest;
import com.bitc.project_inside.data.DTO.SolvedRequest;
import com.bitc.project_inside.data.entity.*;
import com.bitc.project_inside.data.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SimServiceImpl implements SimService {

    private final PersonRepository personRepository;
    private final AlarmRepository alarmRepository;
    private final InquiryRepository inquiryRepository;
    private final ProjectRepository projectRepository;
    private final TodoRepository todoRepository;
    private final ChallengeRepository challengeRepository;
    private final MatchingRepository matchingRepository;
    private final QuestionRepository questionRepository;
    private final SolvedRepository solvedRepository;
    private final AnswerRepository answerRepository;

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
    public void makeAlarm(String alarmToPerson, String alarmContent, String alarmFromPerson, String alarmFrom, String alarmContentIdx) throws Exception {

        AlarmEntity alarmEntity = new AlarmEntity(alarmToPerson, alarmContent, alarmFromPerson, alarmFrom, alarmContentIdx);
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
        return personRepository.findAllByPersonBannedMsgIsNullOrderByPersonIdxDesc();
    }

    @Override
    public List<ProjectEntity> getProjectList() throws Exception {
        return projectRepository.findAllByOrderByProjectDateDesc();
    }

    @Override
    public String personProfileImg(MultipartFile personProfileImg) throws Exception {

        String profileImgName = personProfileImg.getOriginalFilename();
        String fileExtension = profileImgName.substring(profileImgName.lastIndexOf(".") + 1);
        String fileName = System.currentTimeMillis() + "_" + Math.random() + "." + fileExtension;
        String savedImagePath = uploadDir + File.separator + fileName;

        try {
            byte[] imageData = personProfileImg.getBytes();
            ;
            File imageFile = new File(savedImagePath);

            try (FileOutputStream fos = new FileOutputStream(imageFile)) {
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
        return todoRepository.findAllByTodoMatchingIdxOrderByTodoIdxDesc(todoMatchingIdx);
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
    public PersonEntity getUserInfo(String personId) throws Exception {
        return personRepository.findByPersonId(personId);
    }

    @Override
    public void updatePerson(PersonEntity person) throws Exception {
        personRepository.save(person);
    }

    @Override
    public int isPassword(String originalPassword, String plainPassword, PasswordEncoder passwordEncoder) {

        if (passwordEncoder.matches(plainPassword, originalPassword)) {
            return 1;
        } else {
            return 2;
        }
    }

    @Override
    public void sendInquiry(InquiryEntity inquiry) throws Exception {
        inquiryRepository.save(inquiry);
    }

    @Override
    public List<InquiryEntity> getInquiryList(String personNickName) throws Exception {

        if (personNickName.equals("admin")) {
            // 관리자는 모든 문의사항 가져오기
            return inquiryRepository.findAllByOrderByInquiryIdxDesc();
        } else {
            // 유저일 경우 자기 것만
            return inquiryRepository.findByInquiryPersonNick(personNickName);
        }

    }

    @Override
    public void updateInquiry(int idx, String content) throws Exception {
        inquiryRepository.updateInquiry(idx, content);
    }

    @Override
    public List<ChallengeEntity> getChallengeList() throws Exception {
        return challengeRepository.findAll();
    }

    @Override
    public List<ProjectEntity> getMyProjectList(String leader) throws Exception {

        return projectRepository.findByProjectLeaderId(leader);
    }

    @Override
    public List<MatchingEntity> getMyJoinProject(String member) throws Exception {
        return matchingRepository.findByMatchingMemberNick(member);
    }

    @Override
    public List<ProjectEntity> getJoinProject(List<MatchingEntity> myJoinProject) throws Exception {

        List<ProjectEntity> joinProject = new ArrayList<>();
        if (myJoinProject.size() > 0) {
            for (MatchingEntity aMatching : myJoinProject) {
                joinProject.add(projectRepository.findByProjectIdx(aMatching.getMatchingProjectIdx()));
            }
        }
        return joinProject;
    }

    @Override
    public List<ChallengeEntity> getChallengeListLatest() throws Exception {
        return challengeRepository.findAllByOrderByChallengeIdxDesc();
    }

    @Override
    public List<QuestionEntity> getQuestionListLatest() throws Exception {
        return questionRepository.findAllByOrderByQuestionIdxDesc();
    }

    @Override
    public List<PersonEntity> getMyRequestMembers(int idx) throws Exception {

        List<MatchingEntity> members = matchingRepository.findAllByMatchingProjectIdxAndMatchingMemberAccept(idx, "1");
        System.out.println(" members :" + members);
        List<PersonEntity> requestMembers = new ArrayList<>();
        if (members.size() > 0) {
            for (MatchingEntity aMember : members) {
                requestMembers.add(personRepository.findByPersonNickName(aMember.getMatchingMemberNick()));
            }
        }
        System.out.print("requestMembers : " + requestMembers);

        return requestMembers;
    }

    @Override
    public List<MatchingEntity> getMatchingAllList(int idx) throws Exception {
        return matchingRepository.findAllByMatchingProjectIdx(idx);
    }

    @Override
    public List<MatchingEntity> getMyMatchingList(String memberNick) throws Exception {
        return matchingRepository.findAllByMatchingMemberNick(memberNick);
    }

    @Override
    public int countJoinMember(int idx) throws Exception {
        return matchingRepository.countByMatchingProjectIdxAndMatchingMemberAccept(idx, "3");
    }

    @Override
    public void cancelRequest(int idx) throws Exception {
        MatchingEntity matching = matchingRepository.findByMatchingIdx(idx);
        matching.setMatchingMemberAccept("2");
        matchingRepository.save(matching);
    }

    @Override
    public ProjectEntity getProjectInfo(int projectIdx) throws Exception {
        return projectRepository.findByProjectIdx(projectIdx);
    }

    @Override
    public MatchingEntity getMatchingInfo(int projectIdx, String matchingMemberNick) throws Exception {
        return matchingRepository.findByMatchingProjectIdxAndMatchingMemberNickAndMatchingMemberAccept(projectIdx, matchingMemberNick, "1");
    }

    @Override
    public int checkRejectMember(int idx, String nick) throws Exception {
        return matchingRepository.countByMatchingProjectIdxAndMatchingMemberNickAndMatchingMemberAccept(idx, nick, "4");
    }

    @Override
    public int countAcceptMember(int idx) throws Exception {
        return matchingRepository.countByMatchingProjectIdxAndMatchingMemberAccept(idx, "3");
    }

    @Override
    public List<MatchingEntity> getMatchingMembers(int idx) throws Exception {
        return matchingRepository.findAllByMatchingProjectIdxAndMatchingMemberAccept(idx, "3");
    }

    @Override
    public Optional<MatchingEntity> isMatchingMember(int idx, String nick) throws Exception {

        Optional<MatchingEntity> matchingInfo = matchingRepository.findByMatchingProjectIdxAndMatchingMemberAcceptAndMatchingMemberNick(idx, nick, "3");
        if (matchingInfo.isEmpty()) {
            Optional<MatchingEntity> leaderInfo = matchingRepository.findByMatchingProjectIdxAndMatchingLeaderNick(idx, nick);
            if (leaderInfo.isPresent()) {
                return leaderInfo;
            }
        }
        return matchingInfo;

    }

    @Override
    public List<SolvedEntity> getMySolutionList(String nick) throws Exception {

        if (solvedRepository.countBySolvedNick(nick) > 0) {
            return solvedRepository.findAllBySolvedNick(nick);
        } else {
            // 오류 방지
            List<SolvedEntity> emptyList = new ArrayList<>();
            return emptyList;
        }
    }

    @Override
    public List<SolvedRequest> solvedInfoInChallengeInfo(List<SolvedEntity> solvedList) throws Exception {

        if (solvedList.size() > 0) {
            List<SolvedRequest> solvedDtoList = new ArrayList<>();
            for (SolvedEntity solvedItem : solvedList) {
                // 엔티티 정보 dto 타입에 넣기
                SolvedRequest dtoItem = new SolvedRequest();
                dtoItem.setSolvedIdx(solvedItem.getSolvedIdx());
                dtoItem.setSolvedDate(solvedItem.getSolvedDate());
                dtoItem.setSolvedNick(solvedItem.getSolvedNick());
                dtoItem.setSolvedLanguage(solvedItem.getSolvedLanguage());
                dtoItem.setChallengeEntity(challengeRepository.findByChallengeIdx(solvedItem.getSolvedChallengeIdx()));
                solvedDtoList.add(dtoItem);
            }
            return solvedDtoList;
        } else {
            // 오류 방지
            List<SolvedRequest> emptyList = new ArrayList<>();
            return emptyList;
        }

    }

    @Override
    public List<QuestionEntity> getMyQuestionList(String nick) throws Exception {

        if (questionRepository.countByQuestionNick(nick) > 0) {
            return questionRepository.findAllByQuestionNick(nick);
        } else {
            // 오류 방지
            List<QuestionEntity> emptyList = new ArrayList<>();
            return emptyList;
        }
    }

    @Override
    public List<QuestionRequest> questionInfoInChallengeInfo(List<QuestionEntity> questionList) throws Exception {

        if (questionList.size() > 0) {
            List<QuestionRequest> questionDtoList = new ArrayList<>();
            for (QuestionEntity questionItem : questionList) {
                // 엔티티 정보 dto 타입에 넣기 (필요한 것만)
                QuestionRequest dtoItem = new QuestionRequest();
                dtoItem.setQuestionIdx(questionItem.getQuestionIdx());
                dtoItem.setQuestionContent(questionItem.getQuestionContent());
                dtoItem.setQuestionDate(questionItem.getQuestionDate());
                dtoItem.setQuestionLanguage(questionItem.getQuestionLanguage());
                dtoItem.setQuestionTitle(questionItem.getQuestionTitle());
                dtoItem.setQuestionCount(questionItem.getQuestionCount());
                dtoItem.setChallengeEntity(challengeRepository.findByChallengeIdx(questionItem.getQuestionChallengeIdx()));
                questionDtoList.add(dtoItem);
            }
            return questionDtoList;
        } else {
            // 오류 방지
            List<QuestionRequest> emptyList = new ArrayList<>();
            return emptyList;
        }
    }

    @Override
    public List<AnswerEntity> getMyAnswerList(String nick) throws Exception {

        if (answerRepository.countByAnswerNick(nick) > 0) {
            return answerRepository.findAllByAnswerNick(nick);
        } else {
            // 오류 방지
            List<AnswerEntity> emptyList = new ArrayList<>();
            return emptyList;
        }
    }

    @Override
    public List<AnswerRequest> answerInfoInQuestionInfoInChallengeInfo(List<AnswerEntity> answerList) throws Exception {
        if (answerList.size() > 0) {
            // 리턴 타입에 맞춰 리스트 생성
            List<AnswerRequest> answerDtoList = new ArrayList<>();

            for (AnswerEntity answerItem : answerList) {
                AnswerRequest dtoItem = new AnswerRequest();

                // Entity 정보 DTO 타입에 넣기 (필요한 것만)
                dtoItem.setAnswerIdx(answerItem.getAnswerIdx());
                dtoItem.setAnswerContent(answerItem.getAnswerContent());
                dtoItem.setAnswerLanguage(answerItem.getAnswerLanguage());

                // 주가 되는 Entity 객체의 데이터를 이용해서 다른 Entity 타입의 객체를 통째로 DTO 객체에 받아들인다
                dtoItem.setQuestionEntity(questionRepository.findByQuestionIdx(answerItem.getAnswerQuestionIdx()));
                dtoItem.setChallengeEntity(challengeRepository.findByChallengeIdx(dtoItem.getQuestionEntity().getQuestionChallengeIdx()));

                // DTO 리스트에 추가
                answerDtoList.add(dtoItem);
            }
            return answerDtoList;


        } else {
            // 오류 방지
            List<AnswerRequest> emptyList = new ArrayList<>();
            return emptyList;
        }
    }

    @Override
    public List<ProjectEntity> getProjects() throws Exception {
        return projectRepository.findAll();
    }

    @Override
    public List<MatchingEntity> getMatchingList(int idx) throws Exception {
        return matchingRepository.findAllByMatchingProjectIdxAndMatchingMemberAccept(idx, "1");
    }

    @Override
    public void memberAccept(int idx) throws Exception {
        MatchingEntity matching = matchingRepository.findByMatchingIdx(idx);
        matching.setMatchingMemberAccept("3");
        matchingRepository.save(matching);
    }

    @Override
    public void memberReject(int idx) throws Exception {
        MatchingEntity matching = matchingRepository.findByMatchingIdx(idx);
        matching.setMatchingMemberAccept("4");
        matchingRepository.save(matching);
    }


}
