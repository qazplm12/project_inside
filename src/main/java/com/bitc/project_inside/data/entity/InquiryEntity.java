package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="inquiry")
@NoArgsConstructor
@AllArgsConstructor
@Data
@DynamicInsert // 디폴트 값 줄때
@EntityListeners(AuditingEntityListener.class)
public class InquiryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int inquiryIdx;

    @Column
    private String inquiryTitle;

    @Column(length = 1000)
    private String inquiryContent;

    @Column
    private String inquiryPersonNick;

    @Column(length = 1000)
    private String inquiryAnswer;

    // status : 1 - 답변 대기 / 2 - 답변 완료
    @Column
    @ColumnDefault("1")
    private String inquiryStatus;

    @Column
    @CreatedDate
    private LocalDate inquiryDt;

    @Column
    private int inquiryCategory;

}
