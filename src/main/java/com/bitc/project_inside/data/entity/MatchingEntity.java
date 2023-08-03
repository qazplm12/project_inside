package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@Table(name = "matching")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
public class MatchingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int matchingIdx;

    @Column
    private int matchingProjectIdx;

    @Column
    private String matchingLeaderNick;

    @Column
    private String matchingMemberNick;

    @Column
    private String matchingMemberAccept;

}
