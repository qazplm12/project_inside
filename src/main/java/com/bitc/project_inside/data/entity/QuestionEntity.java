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
    private Integer questionIdx;

    @Column
    private int questionChallengeIdx;

    @Column
    private String questionNick;

    @Column
    private String questionLanguage;

    @Column(length = 2000)
    private String questionCode;

    @Column
    private String questionTitle;

    @Column(length = 2000)
    private String questionContent;

    @Column
    @CreatedDate
    private LocalDate questionDate;

    @Column
    private int questionCount;



    @Builder
    public QuestionEntity (int questionIdx, int questionChallengeIdx, String questionNick, String questionLanguage, String questionCode, String questionTitle, String questionContent, LocalDate questionDate, int questionCount) {
        this.questionIdx = questionIdx;
        this.questionNick = questionNick;
        this.questionLanguage = questionLanguage;
        this.questionCode = questionCode;
        this.questionChallengeIdx = questionChallengeIdx;
        this.questionTitle = questionTitle;
        this.questionContent = questionContent;
        this.questionDate = questionDate;
        this.questionCount = questionCount;
    }
}
