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
public class PersonEntity implements UserDetails {

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
    public PersonEntity(String personId, String personPassword, String auth) {
        this.personId = personId;
        this.personPassword = personPassword;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return personPassword;
    }

    @Override
    public String getUsername() {
        return personId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
