package com.bitc.project_inside.data.DTO;

import lombok.*;

@Getter
@Setter
public class MatchingRequest {

    private int matchingIdx;

    private int matchingProjectIdx;

    private String matchingLeaderNick;

    private String matchingMemberNick;

    private String matchingMemberAccept;

}
