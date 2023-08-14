package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.ChallengeEntity;
import com.bitc.project_inside.data.entity.SolutionEntity;
import com.bitc.project_inside.data.entity.SolvedEntity;
import com.bitc.project_inside.data.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LeeServiceImpl implements LeeService {

    private final PersonRepository personRepository;
    private final ChallengeRepository challengeRepository;
    private final SolvedRepository solvedRepository;
    private final SolutionRepository solutionRepository;
    private final ScoringRepository scoringRepository;

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
    public ChallengeEntity selectChallenge(int idx) throws Exception {
        return challengeRepository.findByChallengeIdx(idx);
    }
}
