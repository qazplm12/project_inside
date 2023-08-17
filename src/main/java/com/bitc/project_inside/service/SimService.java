package com.bitc.project_inside.service;


import com.bitc.project_inside.data.entity.AlarmEntity;
import com.bitc.project_inside.data.entity.PersonEntity;

import java.util.List;
import java.util.Optional;

public interface SimService {
    int isUser(String email) throws Exception;

    int isNick(String nickName) throws Exception;

    void insertPerson(PersonEntity person) throws Exception;

    void makeAlarm(String alarmToPerson, String alarmContent, String alarmFromPerson, String alarmFrom) throws Exception;
    // 알림 생성 매개변수
    // 1. 알림 받는 사람 닉네임
    // 2. 알림내용 (문의제목, 프로젝트명, 알고리즘 문제명)
    // 3. 알림 보내는 사람 닉네임
    // 4. 알림 종류(inquiry, challenge, project

    List<AlarmEntity> getAlarmList(String alarmToPerson) throws Exception;

    void readAlarmList(String alarmToPerson) throws Exception;

    void readAlarm(int alarmIdx) throws Exception;

    void inquiryAnswer(int inquiryIdx, String inquiryAnswer) throws Exception;

    List<PersonEntity> getPersonList() throws Exception;
}
