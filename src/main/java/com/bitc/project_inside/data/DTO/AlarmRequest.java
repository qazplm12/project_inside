package com.bitc.project_inside.data.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlarmRequest {
    private int alarmIdx;
    private String alarmUserNick;
    private String alarmContent;
    private String alarmChecked;
}
