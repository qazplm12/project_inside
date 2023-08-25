package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.*;
import com.bitc.project_inside.data.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class LeeServiceImpl implements LeeService {

    private final PersonRepository personRepository;
    private final ChallengeRepository challengeRepository;
    private final SolvedRepository solvedRepository;
    private final SolutionRepository solutionRepository;
    private final ScoringRepository scoringRepository;
    private final ScoringLogRepository scoringLogRepository;
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final ProjectRepository projectRepository;

    @Override
    public List<ChallengeEntity> selectChallengeList() throws Exception {
        return challengeRepository.findAllByOrderByChallengeIdx();
    }

    @Override
    public List<ChallengeEntity> selectChallengeListSolvedState(String userNick, int solvedState) throws Exception {
        List<Integer> solvedStateList = solvedRepository.selectSolvedState(userNick);   // 쿼리 메소드에선 group by, having 사용 불가

        List<ChallengeEntity> challengeList = new ArrayList<>();

        if (solvedState == 1) {   // 해결 한 문제인 경우
            for (int i : solvedStateList) {
                ChallengeEntity challenge = challengeRepository.findByChallengeIdx(i);
                challengeList.add(challenge);
            }
        }
        else {  // 해결 못한 문제인 경우
            challengeList = challengeRepository.findAllByOrderByChallengeIdx();  // 전체 리스트에서
            for (int i : solvedStateList) {    // 푼 문제 빼기
                ChallengeEntity challenge = challengeRepository.findByChallengeIdx(i);
                challengeList.remove(challenge);
            }
        }

        return challengeList;
    }

    @Override
    public List<ChallengeEntity> selectChallengeListClass(int challengeClass) throws Exception {
        return challengeRepository.findAllByChallengeClassOrderByChallengeIdx(challengeClass);
    }

    @Override
    public List<ChallengeEntity> selectChallengeListClassSolvedState(String userNick, int challengeClass, int solvedState) throws Exception {
        List<Integer> solvedStateList = solvedRepository.selectSolvedState(userNick); // 푼 문제 리스트
        List<ChallengeEntity> challengeList = new ArrayList<>();    // 해당 난이도 리스트 출력

        if (solvedState == 1) { // 해결 한 문제인 경우
            for (int i : solvedStateList) {
//                ChallengeEntity challenge = challengeRepository.findByChallengeIdx(i);
                ChallengeEntity challenge = challengeRepository.findByChallengeIdxAndChallengeClass(i, challengeClass);
                if (challenge == null) {
                    break;
                }
                challengeList.add(challenge);
            }
        }
        else {  // 해결 못한 문제인 경우
            challengeList = challengeRepository.findAllByChallengeClassOrderByChallengeIdx(challengeClass);    // 해당 난이도 리스트 출력
            for (int i : solvedStateList) {
                ChallengeEntity challenge = challengeRepository.findByChallengeIdx(i);
                challengeList.remove(challenge);
            }
        }
        return challengeList;
    }

    @Override
    public List<Integer> selectChallengeState(String userNick) throws Exception {
        return solvedRepository.selectSolvedState(userNick);
    }

    @Override
    public ChallengeEntity selectChallenge(int idx) throws Exception {
        return challengeRepository.findByChallengeIdx(idx);
    }

    @Override
    public List<ScoringEntity> selectScoring(int idx) throws Exception {
        return scoringRepository.findAllByScoringChallengeIdx(idx);
    }

    @Override
    public ScoringLogEntity saveScoringLogWrong(String userNick, int idx) throws Exception {
        return scoringLogRepository.save(ScoringLogEntity.builder()
                        .scoringLogNick(userNick)
                        .scoringLogChallengeIdx(idx)
                        .correct("N")
                .build());
    }

    @Override
    public boolean selectSolvedChallenge(String userNick, int idx, String language) throws Exception {
        SolvedEntity solved = solvedRepository.findBySolvedNickAndSolvedChallengeIdxAndSolvedLanguage(userNick, idx, language);
        if (solved != null) {
            return true;
        }
        else {
            return false;
        }
    }

    @Override
    public SolvedEntity saveSolved(String userNick, int idx, String language, String code) throws Exception {
        return solvedRepository.save(SolvedEntity.builder()
                        .solvedNick(userNick)
                        .solvedChallengeIdx(idx)
                        .solvedLanguage(language)
                        .solvedContent(code)
                .build());
    }

    @Override
    public ScoringLogEntity saveScoringLogCorrect(String userNick, int idx) throws Exception {
        return scoringLogRepository.save(ScoringLogEntity.builder()
                        .scoringLogNick(userNick)
                        .scoringLogChallengeIdx(idx)
                        .correct("Y")
                .build());
    }

    @Override
    @Transactional
    public void updateChallenge(int idx) throws Exception {
        int solvedCount = solvedRepository.countBySolvedChallengeIdx(idx);
        int scoringLogCount = scoringLogRepository.countByScoringLogChallengeIdx(idx);
        int correctPercent = solvedCount * 100 / scoringLogCount;

        challengeRepository.updateCompletePerson(idx);
        challengeRepository.updateCorrectPercent(idx, correctPercent);
    }

    @Override
    public List<SolvedEntity> selectSolvedList(int idx) throws Exception {
        return solvedRepository.findAllBySolvedChallengeIdx(idx);
    }

    @Override
    public List<QuestionEntity> selectQnAList(int idx) throws Exception {
        return questionRepository.findAllByQuestionChallengeIdx(idx);
    }

    @Override
    public List<AnswerEntity> selectQnAItems(int idx) throws Exception {
        return answerRepository.findAllByAnswerQuestionIdx(idx);
    }

    @Override
    public QuestionEntity saveQuestion(int idx, String userNick, String language, String code, String title, String content) throws Exception {
        return questionRepository.save(QuestionEntity.builder()
                .questionChallengeIdx(idx)
                .questionNick(userNick)
                .questionLanguage(language)
                .questionCode(code)
                .questionTitle(title)
                .questionContent(content)
                .questionDate(LocalDate.now())
                .build());
    }

    @Override
    public AnswerEntity saveAnswer(int idx, String userNick, String language, String code, String content) throws Exception {
        return answerRepository.save(AnswerEntity.builder()
                        .answerQuestionIdx(idx)
                        .answerNick(userNick)
                        .answerLanguage(language)
                        .answerCode(code)
                        .answerContent(content)
                        .answerDate(LocalDate.now())
                .build());
    }

    @Override
    @Transactional
    public void updateAnswerCount(int idx) throws Exception {
        questionRepository.updateAnswerCount(idx);
    }

    @Override
    public ChallengeEntity saveChallenge(String title, String explain, String limit, String paramExample, String solutionExample, String javaCode, String javaScriptCode, String pythonCode, int challengeClass) throws Exception {
        return challengeRepository.save(ChallengeEntity.builder()
                        .challengeTitle(title)
                        .challengeExplain(explain)
                        .challengeLimit(limit)
                        .challengeParamExample(paramExample)
                        .challengeSolutionExample(solutionExample)
                        .challengeTemplateJava(javaCode)
                        .challengeTemplateJavaScript(javaScriptCode)
                        .challengeTemplatePython(pythonCode)
                        .challengeClass(challengeClass)
                .build());
    }

    @Override
    public int countTotalChallenge(String userNick) throws Exception {
        int num =  solvedRepository.countBySolvedNick(userNick);
        return num;
    }

    @Override
    public List<String> userRank() throws Exception {
        return personRepository.userRank();
    }

    @Override
    public List<Integer> numRank() throws Exception {
        return personRepository.numRank();
    }

    @Override
    public ProjectEntity selectToyAnnony() throws Exception {
        return projectRepository.findFirstByOrderByProjectIdxDesc();
    }

    @Override
    public List<ProjectEntity> selectToyUser(String language) throws Exception {
        return projectRepository.findAllByProjectLanguageContaining(language);
//        return null;
    }

    @Override
    public List<PersonEntity> selectUserProfile() throws Exception {
        return personRepository.findAllPerson();
    }

    @Override
    public QuestionEntity selectQuestionDetail(int idx) throws Exception {
        return questionRepository.findByQuestionIdx(idx);
    }

    @Override
    @Transactional
    public void levelExp(int score, String userNick) throws Exception {
        for (int i = 0; i < 6; i++) {
            if ((i * 10) == score) {
                //레벨 i로 업데이트
                personRepository.levelUp(i, score, userNick);  // 레벨업 업데이트문
            }
            else {
                personRepository.updateTotalScore(score, userNick); // 경험치 획득 이벤트
            }
        }

    }

    @Override
    public PersonEntity selectUserDetail(String userId) throws Exception {
        return personRepository.findByPersonId(userId);
    }
}
