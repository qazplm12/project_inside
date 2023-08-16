package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.ChallengeEntity;
import com.bitc.project_inside.data.entity.InquiryEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface InquiryRepository extends JpaRepository<InquiryEntity, Integer> {


    @Modifying
    @Transactional
    @Query(value = "UPDATE InquiryEntity i SET i.inquiryAnswer = :inquiryAnswer WHERE i.inquiryIdx = :inquiryIdx ")
    void inquiryAnswer(int inquiryIdx, String inquiryAnswer);
}
