package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "scoring")    // 문제에 대한 검산용 매개변수, 기대값 저장 테이블
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ScoringEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scoringIdx;

    @Column
    private int scoringChallengeIdx;    // 문제테이블 idx

    @Column
    private String argu1;

    @Column
    private String argu2;

    @Column
    private String argu3;

    @Column
    private String expectedValue;

}
