package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.SolutionEntity;
import com.bitc.project_inside.data.entity.SolvedEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolvedRepository extends JpaRepository<SolvedEntity, Integer> {

}
