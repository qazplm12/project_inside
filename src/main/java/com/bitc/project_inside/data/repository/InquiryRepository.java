package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.ChallengeEntity;
import com.bitc.project_inside.data.entity.InquiryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InquiryRepository extends JpaRepository<InquiryEntity, Integer> {

}
