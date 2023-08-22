package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;

@Entity
@Table(name="person")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PersonEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int personIdx;

    @Column
    private String personId; // email

    @Column
    private String personPassword;

    @Column
    private String personNickName;

    @Column
    private String personLanguage;

    @Column
    private int personLevel;

    @Column
    private int personTotalScore;

    @Column
    private String personImgPath;
    // 예 : /images/profile.jpg

    //
    @Column
    private String personBannedMsg;

    @Column
    @CreatedDate
    private LocalDate personJoinDt;



    @Builder
    public PersonEntity(String personId, String personPassword, String personNickName, String auth) {
        this.personId = personId;
        this.personPassword = personPassword;
        this.personNickName = personNickName;
    }

}
