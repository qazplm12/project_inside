package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.ChallengeEntity;

import java.util.List;

public interface LeeService {

    List<ChallengeEntity> selectChallengeList() throws Exception;

    List<ChallengeEntity> selectChallengeListSolvedState(String id, int solvedState) throws Exception;

    List<ChallengeEntity> selectChallengeListClass(int challengeClass) throws Exception;

    List<ChallengeEntity> selectChallengeListClassSolvedState(int challengeClass, int solvedState);

    ChallengeEntity selectChallenge(int idx) throws Exception;
}
