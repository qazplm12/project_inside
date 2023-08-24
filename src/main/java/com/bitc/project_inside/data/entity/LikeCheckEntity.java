package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "likeCheck")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@DynamicInsert // 디폴트 값 줄때
@EntityListeners(AuditingEntityListener.class)
public class LikeCheckEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeIdx;

    @Column
    private String memberId;

    @Column
    private int projectIdx;

    @ColumnDefault("0")
    private int likeCheck;
}
