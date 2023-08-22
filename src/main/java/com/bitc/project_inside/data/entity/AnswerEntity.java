package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@Table(name = "answer") // 문제 답변
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnswerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int answerIdx;

    @Column
    private int answerQuestionIdx;

    @Column
    private String answerNick;

    @Column(length = 2000)
    private String answerContent;

    @Column
    private String answerLanguage;

    @Column(length = 2000)
    private String answerCode;

    @Column
    @CreatedDate
    private LocalDate answerDate;

    @Builder
    public AnswerEntity (int answerIdx, int answerQuestionIdx, String answerNick, String answerLanguage, String answerContent, String answerCode, LocalDate answerDate) {
        this.answerIdx = answerIdx;
        this.answerQuestionIdx = answerQuestionIdx;
        this.answerNick = answerNick;
        this.answerLanguage = answerLanguage;
        this.answerContent = answerContent;
        this.answerCode = answerCode;
        this.answerDate = answerDate;
    }
}
