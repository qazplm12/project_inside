package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.ChallengeEntity;

public interface LeeService {

    ChallengeEntity selectChallenge(int idx) throws Exception;
}
