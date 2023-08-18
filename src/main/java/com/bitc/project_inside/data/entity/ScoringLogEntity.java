package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "scoringLog") // 전 회원 문제 푼 내역
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScoringLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scoringLogIdx;

    @Column
    private int scoringLogChallengeIdx;    // 문제테이블 idx

    @Column
    private String scoringLogId;

    @Column
    private String correct;  // 정답 여부

    @Builder
    public ScoringLogEntity(
            int scoringLogIdx,
            int scoringLogChallengeIdx,
            String scoringLogId,
            String correct
    ) {
        this.scoringLogIdx = scoringLogIdx;
        this.scoringLogChallengeIdx = scoringLogChallengeIdx;
        this.scoringLogId = scoringLogId;
        this.correct = correct;
    }
}
