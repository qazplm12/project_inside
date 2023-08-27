package com.bitc.project_inside.data.DTO;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
public class TodoRequest {

    private int todoIdx;

    private int todoMatchingIdx;

    private String todoStatus;

    private String todoTitle;

    private String todoContent; // 오프캔버스 때만 보이기, 상세내용 작성 시

    private String todoMemberNick;

    private LocalDate todoDate;

}
