package com.bitc.project_inside.data.repository;


import com.bitc.project_inside.data.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ProjectRepository extends JpaRepository<ProjectEntity, Integer> {
    List<ProjectEntity> findAllByOrderByProjectDateDesc();

    List<ProjectEntity> findAllByOrderByProjectDateAsc();
}
