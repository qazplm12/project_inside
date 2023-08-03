package com.bitc.project_inside.data.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class QuestionRequest {
    private int questionIdx;
    private String questionId;
    private String questionTitle;
    private String questionContent;
    private LocalDate questionDate;
}
