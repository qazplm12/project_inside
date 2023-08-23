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
import java.util.List;

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

    @Override
    public List<ChallengeEntity> selectChallengeList() throws Exception {
        return challengeRepository.findAllByOrderByChallengeIdx();
    }

    @Override
    public List<ChallengeEntity> selectChallengeListSolvedState(String userId, int solvedState) throws Exception {
        List<Integer> solvedStateList = solvedRepository.selectSolvedState(userId);   // 쿼리 메소드에선 group by, having 사용 불가

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
    public List<ChallengeEntity> selectChallengeListClassSolvedState(String userId, int challengeClass, int solvedState) throws Exception {
        List<Integer> solvedStateList = solvedRepository.selectSolvedState(userId); // 푼 문제 리스트
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
    public List<Integer> selectChallengeState(String userId) throws Exception {
        return solvedRepository.selectSolvedState(userId);
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
    public ScoringLogEntity saveScoringLogWrong(String userId, int idx) throws Exception {
        return scoringLogRepository.save(ScoringLogEntity.builder()
                        .scoringLogId(userId)
                        .scoringLogChallengeIdx(idx)
                        .correct("N")
                .build());
    }

    @Override
    public boolean selectSolvedChallenge(String userId, int idx, String language) throws Exception {
        SolvedEntity solved = solvedRepository.findBySolvedIdAndSolvedChallengeIdxAndSolvedLanguage(userId, idx, language);
        if (solved != null) {
            return true;
        }
        else {
            return false;
        }
    }

    @Override
    public SolvedEntity saveSolved(String userId, int idx, String language, String code) throws Exception {
        return solvedRepository.save(SolvedEntity.builder()
                        .solvedId(userId)
                        .solvedChallengeIdx(idx)
                        .solvedLanguage(language)
                        .solvedContent(code)
                .build());
    }

    @Override
    public ScoringLogEntity saveScoringLogCorrect(String userId, int idx) throws Exception {
        return scoringLogRepository.save(ScoringLogEntity.builder()
                        .scoringLogId(userId)
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


}
