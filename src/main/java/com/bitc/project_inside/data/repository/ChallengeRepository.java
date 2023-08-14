package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.ChallengeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<ChallengeEntity, Integer> {

    List<ChallengeEntity> findAllByOrderByChallengeIdx() throws Exception;

    List<ChallengeEntity> findAllByChallengeClassOrderByChallengeIdx(int challengeClass) throws Exception;

    ChallengeEntity findByChallengeIdx(int idx) throws Exception;

    ChallengeEntity findByChallengeIdxAndChallengeClass(int i, int challengeClass);
}
