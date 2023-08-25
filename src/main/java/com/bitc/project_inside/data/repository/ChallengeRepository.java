package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.ChallengeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChallengeRepository extends JpaRepository<ChallengeEntity, Integer> {

    List<ChallengeEntity> findAllByOrderByChallengeIdx() throws Exception;

    List<ChallengeEntity> findAllByChallengeClassOrderByChallengeIdx(int challengeClass) throws Exception;

    ChallengeEntity findByChallengeIdx(int idx) throws Exception;

    ChallengeEntity findByChallengeIdxAndChallengeClass(int i, int challengeClass) throws Exception;

    @Modifying
    @Query(value = "" +
            "UPDATE ChallengeEntity " +
            "SET challengeCompletePerson = ( " +
            "    SELECT COUNT(solvedChallengeIdx)  " +
            "    FROM SolvedEntity  " +
            "    WHERE solvedChallengeIdx = :idx " +
            ") " +
            "WHERE challengeIdx = :idx " +
            "")
    void updateCompletePerson(@Param("idx") int idx) throws Exception;

    @Modifying
    @Query(value = "" +
            "UPDATE ChallengeEntity " +
            "SET challengeCorrectPercent = :correctPercent " +
            "WHERE challengeIdx = :idx " +
            "")
    void updateCorrectPercent(@Param("idx") int idx, @Param("correctPercent") int correctPercent) throws Exception;

    List<ChallengeEntity> findAllByOrderByChallengeIdxDesc() throws Exception;
}
