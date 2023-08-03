package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "scoring")
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScoringEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scoringIdx;

    @Column
    private int scoringChallengeIdx;    // 문제테이블 idx

    @Column
    private String props1;
    @Column
    private String props2;
    @Column
    private String props3;

    @Column
    private String case1;
    @Column
    private String case2;
    @Column
    private String case3;
    @Column
    private String case4;
    @Column
    private String case5;

    @Column
    private String answer;

    @Builder
    public ScoringEntity(
            int scoringIdx,
            String props1,
            String props2,
            String props3,
            String case1,
            String case2,
            String case3,
            String case4,
            String case5,
            int scoringChallengeIdx,
            String answer
    ) {
        this.scoringIdx = scoringIdx;
        this.props1 = props1;
        this.props2 = props2;
        this.props3 = props3;
        this.case1 = case1;
        this.case2 = case2;
        this.case3 = case3;
        this.case4 = case4;
        this.case5 = case5;
        this.scoringChallengeIdx = scoringChallengeIdx;
        this.answer = answer;
    }
}
