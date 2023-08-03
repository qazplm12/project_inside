package com.bitc.project_inside.data.DTO;

import lombok.*;

@Getter
@Setter
public class PersonRequest {

    private int personIdx;

    private String personId; // email

    private String personPassword;

    private String personNickName;

    private String personLanguage;

    private int personLevel;

    private int personTotalScore;
}
