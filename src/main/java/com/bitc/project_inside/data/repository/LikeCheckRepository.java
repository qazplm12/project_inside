package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.LikeCheckEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeCheckRepository extends JpaRepository<LikeCheckEntity, Integer> {

    List<LikeCheckEntity> findByMemberIdAndLikeCheck(String personId, int i);
}
