package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

public interface LeeService {

    List<ChallengeEntity> selectChallengeList() throws Exception;

    List<ChallengeEntity> selectChallengeListSolvedState(String userNick, int solvedState) throws Exception;

    List<ChallengeEntity> selectChallengeListClass(int challengeClass) throws Exception;

    List<ChallengeEntity> selectChallengeListClassSolvedState(String userNick, int challengeClass, int solvedState) throws Exception;

    List<Integer> selectChallengeState(String userNick) throws Exception;

    ChallengeEntity selectChallenge(int idx) throws Exception;

    List<ScoringEntity> selectScoring(int idx) throws Exception;

    ScoringLogEntity saveScoringLogWrong(String userNick, int idx) throws Exception;

    boolean selectSolvedChallenge(String userNick, int idx, String language) throws Exception;

    SolvedEntity saveSolved(String userNick, int idx, String language, String code) throws Exception;

    ScoringLogEntity saveScoringLogCorrect(String userNick, int idx) throws Exception;

    void updateChallenge(int idx) throws Exception;

    List<SolvedEntity> selectSolvedList(int idx) throws Exception;

    List<QuestionEntity> selectQnAList(int idx) throws Exception;

    List<AnswerEntity> selectQnAItems(int idx) throws Exception;

    QuestionEntity saveQuestion(int idx, String userNick, String language, String code, String title, String content) throws Exception;

    AnswerEntity saveAnswer(int idx, String userNick, String language, String code, String content) throws Exception;

    void updateAnswerCount(int idx) throws Exception;

    ChallengeEntity saveChallenge(String title, String explain, String limit, String paramExample, String solutionExample, String javaCode, String javaScriptCode, String pythonCode, int challengeClass) throws Exception;

    int countTotalChallenge(String userNick) throws Exception;

    List<String> userRank() throws Exception;

    List<Integer> numRank() throws Exception;

    ProjectEntity selectToyAnnony() throws Exception;

    List<ProjectEntity> selectToyUser(String language) throws Exception;

    List<PersonEntity> selectUserProfile() throws Exception;

    QuestionEntity selectQuestionDetail(int idx) throws Exception;

    void levelExp(int score, String userNick) throws Exception;

    PersonEntity selectUserDetail(String userId) throws Exception;
}
