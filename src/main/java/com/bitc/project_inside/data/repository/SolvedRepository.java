package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.ChallengeEntity;
import com.bitc.project_inside.data.entity.SolutionEntity;
import com.bitc.project_inside.data.entity.SolvedEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SolvedRepository extends JpaRepository<SolvedEntity, Integer> {

//    @Query(value = "" +
//            "SELECT COUNT(s.solvedChallengeIdx) AS state " +
//            "FROM SolvedEntity S " +
//            "JOIN SolutionEntity U " +
//            "ON S.solvedId = U.solutionId AND S.solvedChallengeIdx = U.solutionChallengeIdx " +
//            "WHERE S.solvedChallengeIdx = :state AND S.solvedId = :id" +
//            "")

// 큰 따옴표 끝에 꼭 띄어쓰기 ....
    @Query(value = "" +
            "SELECT solvedChallengeIdx " +
            "FROM SolvedEntity " +
            "WHERE solvedId = :id " +
            "GROUP BY solvedChallengeIdx " +
            "")
    List<Integer> selectSolvedState(@Param("id") String id) throws Exception;
}
