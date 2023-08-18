package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.ScoringEntity;
import com.bitc.project_inside.data.entity.ScoringLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoringRepository extends JpaRepository<ScoringEntity, Integer> {

    List<ScoringEntity> findAllByScoringChallengeIdx(int idx);
}
