package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.InquiryEntity;
import com.bitc.project_inside.data.entity.MatchingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchingRepository extends JpaRepository<MatchingEntity, Integer> {

}
