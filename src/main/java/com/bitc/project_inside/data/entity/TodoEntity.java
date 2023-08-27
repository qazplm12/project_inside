package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "todo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EntityListeners(AuditingEntityListener.class)
public class TodoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int todoIdx;

    @Column
    private int todoMatchingIdx;

    @Column
    private String todoStatus;

    @Column
    private String todoTitle;

    @Column(length = 500)
    private String todoContent; // 오프캔버스 때만 보이기, 상세내용 작성 시

    @Column
    private String todoMemberNick;

    @Column
    private LocalDate todoStartDate;

    @Column
    private LocalDate todoEndDate;

    // 진행률
    @Column
    private int todoProgress;

}
