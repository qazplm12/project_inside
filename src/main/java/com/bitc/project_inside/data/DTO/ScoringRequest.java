package com.bitc.project_inside.data.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoringRequest {
    private int scoringIdx;
    private int scoringChallengeIdx;    // 문제테이블 idx
    private String argu1;
    private String argu2;
    private String argu3;
    private String expectedValue;
}
