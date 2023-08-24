package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="person")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
public class PersonEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int personIdx;

    @Column
    private String personId; // email

    @Column
    private String personPassword;

    @Column
    @CreatedDate
    private LocalDate personPasswordUpdateDt;

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

    @Column
    private String personBannedMsg;

    @Column
    @CreatedDate
    private LocalDate personJoinDt;

//    public enum PersonRole {
//        USER, ADMIN
//    }
//
//    @ElementCollection(fetch= FetchType.LAZY)
////    @Builder.Default
//    private Set<PersonRole> roleSet=new HashSet<>();
//
//    public void addPersonRole(PersonRole personRole){
//        roleSet.add(personRole);
//    }

    @Builder
    public PersonEntity(String personId, String personPassword, String personNickName, String auth) {
        this.personId = personId;
        this.personPassword = personPassword;
        this.personNickName = personNickName;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("person"));
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
