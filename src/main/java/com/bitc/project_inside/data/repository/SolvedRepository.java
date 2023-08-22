package com.bitc.project_inside.data.repository;

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

// 큰 따옴표 끝에 꼭 띄어쓰기 ...., 쿼리 메소드에선 group by, having 사용 불가
    @Query(value = "" +
            "SELECT solvedChallengeIdx " +
            "FROM SolvedEntity " +
            "WHERE solvedId = :userId " +
            "GROUP BY solvedChallengeIdx " +
            "")
    List<Integer> selectSolvedState(@Param("userId") String userId) throws Exception;

    SolvedEntity findBySolvedIdAndSolvedChallengeIdxAndSolvedLanguage(String userId, int idx, String language) throws Exception;

    int countBySolvedChallengeIdx(int idx) throws Exception;

    List<SolvedEntity> findAllBySolvedChallengeIdx(int idx) throws Exception;
}
