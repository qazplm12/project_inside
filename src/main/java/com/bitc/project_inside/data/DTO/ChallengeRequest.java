package com.bitc.project_inside.data.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeRequest {
    private int challengeIdx;
    private String challengeTitle;
    private String challengeContent;
    private int challengeClass;
}
