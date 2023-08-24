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

    private String solvedNick;    // 나중에 nick으로 변경

    private String solvedContent;

    private String solvedLanguage;

    @CreatedDate
    private LocalDate solvedDate;

//    @OneToOne
//    @JoinColumn(name = "solvedId", referencedColumnName = "solutionId")
//    @JoinColumn(name = "solvedIdx", referencedColumnName = "solutionIdx")
//    private SolutionEntity solutionEntity;

    @Builder
    public SolvedEntity (int solvedIdx, int solvedChallengeIdx, String solvedNick, String solvedContent, String solvedLanguage, LocalDate solvedDate) {
        this.solvedIdx = solvedIdx;
        this.solvedChallengeIdx = solvedChallengeIdx;
        this.solvedNick = solvedNick;
        this.solvedContent = solvedContent;
        this.solvedLanguage = solvedLanguage;
        this.solvedDate = solvedDate;
    }
}
