package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.ChallengeEntity;
import com.bitc.project_inside.data.entity.InquiryEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InquiryRepository extends JpaRepository<InquiryEntity, Integer> {


    @Modifying
    @Transactional
    @Query(value = "UPDATE InquiryEntity i SET i.inquiryAnswer = :inquiryAnswer, i.inquiryStatus = '2' WHERE i.inquiryIdx = :inquiryIdx ")
    void inquiryAnswer(int inquiryIdx, String inquiryAnswer);

    List<InquiryEntity> findByInquiryPersonNick(String personNickName) throws Exception;

    @Modifying
    @Transactional
    @Query(value = "UPDATE InquiryEntity i SET i.inquiryContent = :content WHERE i.inquiryIdx = :idx ")
    void updateInquiry(int idx, String content)throws Exception;

    List<InquiryEntity> findAllByOrderByInquiryIdxDesc();
}
