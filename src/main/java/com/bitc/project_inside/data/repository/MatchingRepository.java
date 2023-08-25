package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.InquiryEntity;
import com.bitc.project_inside.data.entity.MatchingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatchingRepository extends JpaRepository<MatchingEntity, Integer> {

    List<MatchingEntity> findByMatchingMemberNick(String member) throws Exception;

    int countByMatchingLeaderNick(String personId) throws Exception;

    List<MatchingEntity> findAllByMatchingProjectIdxAndMatchingMemberAccept(int idx, String i);

    List<MatchingEntity> findAllByMatchingProjectIdx(int idx) throws Exception;

    MatchingEntity findByMatchingIdx(int idx) throws Exception;

    List<MatchingEntity> findAllByMatchingMemberNick(String memberNick) throws Exception;

    int countByMatchingProjectIdxAndMatchingMemberAccept(int idx, String number) throws Exception;
}
