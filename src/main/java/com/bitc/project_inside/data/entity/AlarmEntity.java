package com.bitc.project_inside.data.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

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

    // N - 한번도 읽지 않음 / A - 알림 펼쳐봤지만 확인하지 않음 / Y - 확인함
    // A인 데이터들 로그인 시 N으로 초기화
    // icon 누르고 리스트 확인시 A로 초기화
    // 리스트 클릭하여 내용 확인 시 Y
    @Column
    private String alarmChecked;

    @Builder
    public AlarmEntity (String alarmToPerson, String alarmFromPerson, String alarmFrom) {
        this.alarmToPerson = alarmToPerson;
        this.alarmFromPerson = alarmFromPerson;
        this.alarmFrom = alarmFrom;
    }
}
