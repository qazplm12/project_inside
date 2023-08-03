package com.bitc.project_inside.data.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AnswerRequest {
    private int answerIdx;
    private String answerAlgoId;
    private String answerContent;
    private LocalDate answerDate;
}
