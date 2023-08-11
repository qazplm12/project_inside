package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@Table(name = "question")   // 문제 질문
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int questionIdx;

    @Column
    private int questionChallengeIdx;

    @Column
    private String questionId;

    @Column
    private String questionTitle;

    @Column
    private String questionLanguage;

    @Column(length = 2000)
    private String questionContent;

    @Column
    @CreatedDate
    private LocalDate questionDate;



    @Builder
    public QuestionEntity (int questionIdx, int questionChallengeIdx, String questionId, String questionTitle, String questionContent, LocalDate questionDate) {
        this.questionIdx = questionIdx;
        this.questionId = questionId;
        this.questionChallengeIdx = questionChallengeIdx;
        this.questionTitle = questionTitle;
        this.questionContent = questionContent;
        this.questionDate = questionDate;
    }
}
