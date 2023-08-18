package com.bitc.project_inside.data.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoringLogRequest {
    private int scoringLogIdx;
    private int scoringLogChallengeIdx;
    private String scoringLogId;
    private String correct;
}
