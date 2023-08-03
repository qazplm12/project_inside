package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.ProjectEntity;
import com.bitc.project_inside.data.entity.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<QuestionEntity, Integer> {

}
