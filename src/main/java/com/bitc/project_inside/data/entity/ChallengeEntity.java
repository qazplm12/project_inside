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

    @Column(length = 3000)
    private String challengeExplain;

    @Column
    private String challengeLimit;

    @Column
    private String challengeParamExample;

    @Column
    private String challengeSolutionExample;

    @Column
    private int challengeClass;

    @Column(columnDefinition = "0")
//    @ColumnDefault("0")
    private int challengeCompletePerson;    // 필요없음!! 지워버렷

    @Column
    @ColumnDefault("0")
    private int challengeCorrectPercent;

    @Column
    private int challengeScore;

    // 생성자는 Impl을 사용할 때 필수
//    @Builder    // 매개변수 없는 @Builder를(생성자를) 만들어 주는것이 @NoArgsConstructor
//    public AlgoEntity () {}

//    @Builder    // 매개변수 있는 @Builder를(생성자를) 만들어 주는것이 @AllArgsConstructor
//    public ChallengeEntity(int challengeIdx, String challengeTitle, String challengeExplain, String challengeLimit, String challengeParamExample, String challengeSolutionExample, int challengeClass, int challengeScore) {
//        this.challengeIdx = challengeIdx;
//        this.challengeTitle = challengeTitle;
//        this.challengeExplain = challengeExplain;
//        this.challengeLimit = challengeLimit;
//        this.challengeParamExample = challengeParamExample;
//        this.challengeSolutionExample = challengeSolutionExample;
//        this.challengeClass = challengeClass;
//        this.challengeScore = challengeScore;
//    }

}
