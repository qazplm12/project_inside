package com.bitc.project_inside.data.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoringRequest {
    private int scoringIdx;

    private String props1;
    private String props2;
    private String props3;

    private String case1;
    private String case2;
    private String case3;
    private String case4;
    private String case5;

    private int scoringAlgoIdx;
    private String correct;
}
