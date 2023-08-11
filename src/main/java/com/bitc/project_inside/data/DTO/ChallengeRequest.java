package com.bitc.project_inside.data.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeRequest {
    private int challengeIdx;
    private String challengeTitle;
    private String challengeExplain;
    private String challengeLimit;
    private String challengeParamExample;
    private String challengeSolutionExample;
    private int challengeClass;
    private int challengeScore;
}
