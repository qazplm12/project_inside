package com.bitc.project_inside.data.DTO;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

//@Builder
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
@Getter
@Setter
@ToString
public class PersonRequest extends User {

    private int personIdx;

    private String personId; // email

    private String personPassword;

    private String personNickName;

    private String personLanguage;

    private int personLevel;


    public PersonRequest(String username, String password, Collection<? extends GrantedAuthority> authorities){
        //User 클래스의 생성자를 호출한다.
        super(username, password, authorities);

        this.personId = username;
        this.personPassword = password;
    }

//    @Builder
//    public PersonRequest(int personIdx, String personId, String personPassword) {
//        this.personIdx = personIdx;
//        this.personId = personId;
//        this.personPassword = personPassword;
//
//    }
}
