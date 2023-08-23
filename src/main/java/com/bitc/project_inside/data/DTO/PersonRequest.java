package com.bitc.project_inside.data.DTO;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.time.LocalDate;
import java.util.Collection;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
//@Getter
//@Setter
//@ToString
public class PersonRequest {

    private String token;

    private int personIdx;

    private String personId; // email

    private String personPassword;

    private String personNickName;

    private String personLanguage;

    private int personTotalScore;

    private String personImgPath;

    private String personBannedMsg;

    private int personLevel;

    private LocalDate personJoinDt;


//    public PersonRequest(String username, String password, Collection<? extends GrantedAuthority> authorities){
//        //User 클래스의 생성자를 호출한다.
//        super(username, password, authorities);
//
//        this.personId = username;
//        this.personPassword = password;
//    }

//    @Builder
//    public PersonRequest(int personIdx, String personId, String personPassword) {
//        this.personIdx = personIdx;
//        this.personId = personId;
//        this.personPassword = personPassword;
//
//    }
}