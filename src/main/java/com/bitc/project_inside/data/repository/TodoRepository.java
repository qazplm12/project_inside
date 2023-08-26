package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.SolvedEntity;
import com.bitc.project_inside.data.entity.TodoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<TodoEntity, Integer> {

    List<TodoEntity> findAllByTodoMatchingIdxOrderByTodoIdxDesc(int todoMatchingIdx);
}
