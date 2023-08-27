package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.DTO.QuestionRequest;
import com.bitc.project_inside.data.entity.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<QuestionEntity, Integer> {

    List<QuestionEntity> findAllByQuestionChallengeIdxOrderByQuestionIdxDesc(int idx) throws Exception;

    @Modifying
    @Query(value = "" +
            "UPDATE QuestionEntity " +
            "SET questionCount = " +
            "(SELECT COUNT(answerIdx) FROM AnswerEntity WHERE answerQuestionIdx = :idx) " +
            "WHERE questionIdx = :idx " +
            "")
    void updateAnswerCount(int idx);

    QuestionEntity findByQuestionIdx(int idx) throws Exception;

    List<QuestionEntity> findAllByOrderByQuestionIdxDesc() throws Exception;

    int countByQuestionNick(String nick) throws Exception;

    List<QuestionEntity> findAllByQuestionNick(String nick) throws Exception;
}
