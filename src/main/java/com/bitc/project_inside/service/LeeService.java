package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.ChallengeEntity;
import com.bitc.project_inside.data.entity.ScoringEntity;
import com.bitc.project_inside.data.entity.SolvedEntity;

import java.util.List;

public interface LeeService {

    List<ChallengeEntity> selectChallengeList() throws Exception;

    List<ChallengeEntity> selectChallengeListSolvedState(String userId, int solvedState) throws Exception;

    List<ChallengeEntity> selectChallengeListClass(int challengeClass) throws Exception;

    List<ChallengeEntity> selectChallengeListClassSolvedState(String userId, int challengeClass, int solvedState) throws Exception;

    List<Integer> selectChallengeState(String userId) throws Exception;

    ChallengeEntity selectChallenge(int idx) throws Exception;

    List<ScoringEntity> selectScoring(int idx) throws Exception;
}
