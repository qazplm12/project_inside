package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
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
    private String challengeContent;

    @Column
    private int challengeClass;

    @Column
    private int challengeScore;

    // 생성자는 Impl을 사용할 때 필수
//    @Builder    // 매개변수 없는 @Builder를(생성자를) 만들어 주는것이 @NoArgsConstructor
//    public AlgoEntity () {}

//    @Builder    // 매개변수 있는 @Builder를(생성자를) 만들어 주는것이 @AllArgsConstructor
//    public AlgoEntity(int algoIdx, String algoTitle, String algoContent, int algoClass) {
//        this.algoIdx = algoIdx;
//        this.algoTitle = algoTitle;
//        this.algoContent = algoContent;
//        this.algoClass = algoClass;
//    }

}
