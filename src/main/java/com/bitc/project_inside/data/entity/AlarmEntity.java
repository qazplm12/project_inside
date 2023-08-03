package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name="alarm")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EntityListeners(AuditingEntityListener.class) // 알람에 날짜정보 넣을거면 컬럼추가
public class AlarmEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int alarmIdx;

    @Column
    private String alarmToPerson; // 받는사람

    @Column
    private String alarmFromPerson; // 보내는 사람

    @Column
    private String alarmFrom; // 알람 보낸 곳

    @Column
    private String alarmChecked;
}
