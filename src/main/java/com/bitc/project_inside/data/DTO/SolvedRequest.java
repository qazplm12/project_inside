package com.bitc.project_inside.data.DTO;

import com.bitc.project_inside.data.entity.ChallengeEntity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SolvedRequest {
    private int solvedIdx;
    private int solvedChallengeIdx;
    private String solvedNick;
    private String solvedContent;
    private String solvedLanguage;
    private LocalDate solvedDate;
    private ChallengeEntity challengeEntity;
}
