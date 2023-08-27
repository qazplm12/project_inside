package com.bitc.project_inside.data.DTO;

import com.bitc.project_inside.data.entity.ChallengeEntity;
import com.bitc.project_inside.data.entity.QuestionEntity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;

@Getter
@Setter
public class AnswerRequest {
    private int answerIdx;
    private int answerQuestionIdx;
    private String answerNick;
    private String answerContent;
    private String answerLanguage;
    private String answerCode;
    private LocalDate answerDate;
    private ChallengeEntity challengeEntity;
    private QuestionEntity questionEntity;
}
