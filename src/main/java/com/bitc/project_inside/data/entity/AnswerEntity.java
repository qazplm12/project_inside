package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Entity
@Table(name = "answer")
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
    private String answerChallengeId;

    @Column(length = 2000)
    private String answerContent;

    @Column
    @CreatedDate
    private LocalDate answerDate;

    @Builder
    public AnswerEntity (int answerIdx, int answerQuestionIdx, String answerChallengeId, String answerContent, LocalDate answerDate) {
        this.answerIdx = answerIdx;
        this.answerChallengeId = answerChallengeId;
        this.answerQuestionIdx = answerQuestionIdx;
        this.answerContent = answerContent;
        this.answerDate = answerDate;
    }
}
