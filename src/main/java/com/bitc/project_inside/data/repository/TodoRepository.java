package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.SolvedEntity;
import com.bitc.project_inside.data.entity.TodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<TodoEntity, Integer> {

}
