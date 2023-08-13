package com.bitc.project_inside.data.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SolvedRequest {
    private int solvedIdx;
    private int solvedChallengeIdx;
    private String solvedId;
    private String solvedContent;
    private LocalDate solvedDate;
}
