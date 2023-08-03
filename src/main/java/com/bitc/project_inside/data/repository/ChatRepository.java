package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.ChallengeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChallengeEntity, Integer> {

}
