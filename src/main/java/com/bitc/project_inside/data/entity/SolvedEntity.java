package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@Table(name = "solved")
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SolvedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int solvedIdx;

    private int solvedAlgoIdx;

    private String solvedContent;

    @CreatedDate
    private LocalDate solvedDate;

    @Builder
    public SolvedEntity (int solvedIdx, int solvedAlgoIdx, String solvedContent, LocalDate solvedDate) {
        this.solvedIdx = solvedIdx;
        this.solvedAlgoIdx = solvedAlgoIdx;
        this.solvedContent = solvedContent;
        this.solvedDate = solvedDate;
    }
}
