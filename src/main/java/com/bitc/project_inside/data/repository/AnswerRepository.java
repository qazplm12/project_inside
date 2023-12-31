package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.AnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<AnswerEntity, Integer> {

    List<AnswerEntity> findAllByAnswerQuestionIdx(int idx) throws Exception;

    int countByAnswerNick(String nick) throws Exception;

    List<AnswerEntity> findAllByAnswerNick(String nick) throws Exception;
}
