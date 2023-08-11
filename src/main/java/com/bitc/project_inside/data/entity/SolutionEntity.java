package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "solution")   // 문제 풀이법 페이지
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SolutionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int solutionIdx;

    @Column
    private String solutionId;  // 회원테이블 id

    @Column
    private int solutionChallengeIdx; // 문제테이블 idx

    @Column
    private String solutionLanguage;

    @Builder
    public SolutionEntity (int solutionIdx, String solutionId, int solutionChallengeIdx, String solutionLanguage) {
        this.solutionIdx = solutionIdx;
        this.solutionId = solutionId;
        this.solutionChallengeIdx = solutionChallengeIdx;
        this.solutionLanguage = solutionLanguage;
    }
}
