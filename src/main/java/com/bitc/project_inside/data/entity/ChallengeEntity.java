package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "challenge")
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor // @Builder 없이 이거로 생성자 사용 가능한지 테스트
public class ChallengeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)   // auto_increment 자동생성은 int 와 float 만 가능
    private int challengeIdx;

    @Column
    private String challengeTitle;

    @Column(length = 2000)
    private String challengeExplain;

    @Column
    private String challengeLimit;

    @Column(length = 1000)
    private String challengeParamExample;

    @Column(length = 1000)
    private String challengeSolutionExample;

    @Column(length = 2000)
    private String challengeTemplateJava;

    @Column(length = 2000)
    private String challengeTemplateJavaScript;

    @Column(length = 2000)    // 이거만 만들면 오류나서 잠시 주석 => 테이블에 총 용량이 있기 때문에 생성이 안됐던것 var 길이를 줄이고 없앤 다음 만들면 됨
    private String challengeTemplatePython;

    @Column
    private int challengeClass;

    @Column(columnDefinition = "0")
    private int challengeCompletePerson;

    @Column
    @ColumnDefault("0")
    private int challengeCorrectPercent;

    @Column
    private int challengeScore;

    // 생성자는 Impl을 사용할 때 필수
//    @Builder    // 매개변수 없는 @Builder를(생성자를) 만들어 주는것이 @NoArgsConstructor
//    public AlgoEntity () {}

    @Builder    // 매개변수 있는 @Builder를(생성자를) 만들어 주는것이 @AllArgsConstructor
    public ChallengeEntity(int challengeIdx,
                           String challengeTitle,
                           String challengeExplain,
                           String challengeLimit,
                           String challengeParamExample,
                           String challengeSolutionExample,
                           String challengeTemplateJava,
                           String challengeTemplateJavaScript,
                           String challengeTemplatePython,
                           int challengeClass,
                           int challengeCompletePerson,
                           int challengeScore) {
        this.challengeIdx = challengeIdx;
        this.challengeTitle = challengeTitle;
        this.challengeExplain = challengeExplain;
        this.challengeLimit = challengeLimit;
        this.challengeParamExample = challengeParamExample;
        this.challengeSolutionExample = challengeSolutionExample;
        this.challengeTemplateJava = challengeTemplateJava;
        this.challengeTemplateJavaScript = challengeTemplateJavaScript;
        this.challengeTemplatePython = challengeTemplatePython;
        this.challengeClass = challengeClass;
        this.challengeCompletePerson = challengeCompletePerson;
        this.challengeScore = challengeScore;
    }

}
