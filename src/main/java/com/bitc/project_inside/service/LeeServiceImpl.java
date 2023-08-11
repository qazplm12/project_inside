package com.bitc.project_inside.service;


import com.bitc.project_inside.data.DTO.ChallengeRequest;
import com.bitc.project_inside.data.entity.ChallengeEntity;
import com.bitc.project_inside.data.repository.ChallengeRepository;
import com.bitc.project_inside.data.repository.PersonRepository;
import com.bitc.project_inside.mapper.PiMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LeeServiceImpl implements LeeService {

//    private final PersonRepository personRepository;
    private final ChallengeRepository challengeRepository;

    @Override
    public ChallengeEntity selectChallenge(int idx) throws Exception {
        return challengeRepository.findByChallengeIdx(idx);
    }
}
