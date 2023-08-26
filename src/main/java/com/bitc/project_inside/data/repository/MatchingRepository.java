package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.InquiryEntity;
import com.bitc.project_inside.data.entity.MatchingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MatchingRepository extends JpaRepository<MatchingEntity, Integer> {

    List<MatchingEntity> findByMatchingMemberNick(String member) throws Exception;

    int countByMatchingLeaderNick(String personId) throws Exception;

    List<MatchingEntity> findAllByMatchingProjectIdxAndMatchingMemberAccept(int idx, String i);

    List<MatchingEntity> findAllByMatchingProjectIdx(int idx) throws Exception;

    MatchingEntity findByMatchingIdx(int idx) throws Exception;

    List<MatchingEntity> findAllByMatchingMemberNick(String memberNick) throws Exception;

    int countByMatchingProjectIdxAndMatchingMemberAccept(int idx, String number) throws Exception;

    MatchingEntity findByMatchingProjectIdxAndMatchingMemberNickAndMatchingMemberAccept(int projectIdx, String matchingMemberNick, String number);

    int countByMatchingProjectIdxAndMatchingMemberNickAndMatchingMemberAccept(int idx, String nick, String number) throws Exception;


    Optional<MatchingEntity> findByMatchingProjectIdxAndMatchingMemberAcceptAndMatchingMemberNick(int idx, String nick, String number) throws Exception;

    Optional<MatchingEntity> findByMatchingProjectIdxAndMatchingLeaderNick(int idx, String nick) throws Exception;
}
