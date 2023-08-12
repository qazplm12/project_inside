package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.ChallengeEntity;

import java.util.List;

public interface LeeService {

    List<ChallengeEntity> selectChallengeList() throws Exception;

    List<ChallengeEntity> selectChallengeListState(int state);

    List<ChallengeEntity> selectChallengeListClass(int challengeClass) throws Exception;

    List<ChallengeEntity> selectChallengeListClassState(int challengeClass, int state);

    ChallengeEntity selectChallenge(int idx) throws Exception;
}
