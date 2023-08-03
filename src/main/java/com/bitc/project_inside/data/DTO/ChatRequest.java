package com.bitc.project_inside.data.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRequest {
    private int chatIdx;
    private int chatMatchingIdx;
    private String chatMemberNick;
    private String chatContent;
    private String chatTime;
}
