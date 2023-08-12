package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.ChallengeEntity;
import com.bitc.project_inside.data.repository.ChallengeRepository;
import com.bitc.project_inside.data.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LeeServiceImpl implements LeeService {

    private final PersonRepository personRepository;
    private final ChallengeRepository challengeRepository;

    @Override
    public List<ChallengeEntity> selectChallengeList() throws Exception {
        return challengeRepository.findAllByOrderByChallengeIdx();
    }

    @Override
    public List<ChallengeEntity> selectChallengeListState(int state) {
//        return challengeRepository.findAllByStateOrderByChallengeIdx(state);
        return null;
    }

    @Override
    public List<ChallengeEntity> selectChallengeListClass(int challengeClass) throws Exception {
        return challengeRepository.findAllByChallengeClassOrderByChallengeIdx(challengeClass);
    }

    @Override
    public List<ChallengeEntity> selectChallengeListClassState(int challengeClass, int state) {
        return null;
    }

    @Override
    public ChallengeEntity selectChallenge(int idx) throws Exception {
        return challengeRepository.findByChallengeIdx(idx);
    }
}
