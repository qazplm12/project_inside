package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.AlarmEntity;
import com.bitc.project_inside.data.entity.AnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<AnswerEntity, Integer> {

}
