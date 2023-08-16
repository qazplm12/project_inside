package com.bitc.project_inside.data.repository;


import com.bitc.project_inside.data.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<ProjectEntity, Integer> {
}
