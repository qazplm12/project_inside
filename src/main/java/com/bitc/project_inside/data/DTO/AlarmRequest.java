package com.bitc.project_inside.data.DTO;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
public class AlarmRequest {
    private int alarmIdx;
    private String alarmToPerson; // 받는사람
    private String alarmFromPerson; // 보내는 사람
    // 알람 종류 구분용
    private String alarmFrom; // 알람 보낸 곳
    //
    private String alarmContent; // 문의 - 문의제목 / 문제 - 문제 제목 / 프로젝트 - 프로젝트 명
    //    //
    private String alarmContentIdx; // 주소를 찍어주기 위한
    // N - 한번도 읽지 않음 / A - 알림 펼쳐봤지만 확인하지 않음 / Y - 확인함
    // N은 뱃지로 개수 카운트 / 알림에 new 배지 표현
    // icon 누르고 리스트 확인시 A로 값 변경
    // 리스트 클릭하여 내용 확인 시 Y로 값 변경
    private String alarmChecked;
}
