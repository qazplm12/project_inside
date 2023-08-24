package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

public interface LeeService {

    List<ChallengeEntity> selectChallengeList() throws Exception;

    List<ChallengeEntity> selectChallengeListSolvedState(String userId, int solvedState) throws Exception;

    List<ChallengeEntity> selectChallengeListClass(int challengeClass) throws Exception;

    List<ChallengeEntity> selectChallengeListClassSolvedState(String userId, int challengeClass, int solvedState) throws Exception;

    List<Integer> selectChallengeState(String userId) throws Exception;

    ChallengeEntity selectChallenge(int idx) throws Exception;

    List<ScoringEntity> selectScoring(int idx) throws Exception;

    ScoringLogEntity saveScoringLogWrong(String userId, int idx) throws Exception;

    boolean selectSolvedChallenge(String userId, int idx, String language) throws Exception;

    SolvedEntity saveSolved(String userId, int idx, String language, String code) throws Exception;

    ScoringLogEntity saveScoringLogCorrect(String userId, int idx) throws Exception;

    void updateChallenge(int idx) throws Exception;

    List<SolvedEntity> selectSolvedList(int idx) throws Exception;

    List<QuestionEntity> selectQnAList(int idx) throws Exception;

    List<AnswerEntity> selectQnAItems(int idx) throws Exception;

    QuestionEntity saveQuestion(int idx, String userNick, String language, String code, String title, String content) throws Exception;

    AnswerEntity saveAnswer(int idx, String userNick, String language, String code, String content) throws Exception;

    void updateAnswerCount(int idx) throws Exception;

    ChallengeEntity saveChallenge(String title, String explain, String limit, String paramExample, String solutionExample, String javaCode, String javaScriptCode, String pythonCode, int challengeClass) throws Exception;

    int countTotalChallenge(String userId) throws Exception;

    int userRank(String userId) throws Exception;

    ProjectEntity selecttoyAnnony() throws Exception;
}
