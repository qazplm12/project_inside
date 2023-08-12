package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@Table(name = "solved") // 내가 푼 문제
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SolvedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int solvedIdx;

    private int solvedChallengeIdx;

    private String solvedContent;

    @CreatedDate
    private LocalDate solvedDate;

    @Builder
    public SolvedEntity (int solvedIdx, int solvedChallengeIdx, String solvedContent, LocalDate solvedDate) {
        this.solvedIdx = solvedIdx;
        this.solvedChallengeIdx = solvedChallengeIdx;
        this.solvedContent = solvedContent;
        this.solvedDate = solvedDate;
    }
}
