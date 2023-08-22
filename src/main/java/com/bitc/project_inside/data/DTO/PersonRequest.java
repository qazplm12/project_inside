package com.bitc.project_inside.data.DTO;

import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonRequest {

    private String token;
    private int personIdx;

    private String personId; // email

    private String personPassword;

    private String personNickName;

    private String personLanguage;

    private int personLevel;



//    @Builder
//    public PersonRequest(int personIdx, String personId, String personPassword) {
//        this.personIdx = personIdx;
//        this.personId = personId;
//        this.personPassword = personPassword;
//
//    }
}
