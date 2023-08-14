package com.bitc.project_inside.service;


import com.bitc.project_inside.data.entity.AlarmEntity;
import com.bitc.project_inside.data.entity.PersonEntity;

import java.util.List;
import java.util.Optional;

public interface SimService {
    int isUser(String email) throws Exception;

    int isNick(String nickName) throws Exception;

    void insertPerson(PersonEntity person) throws Exception;

    void makeAlarm(String alarmToPerson, String alarmFromPerson, String alarmFrom) throws Exception;

    List<AlarmEntity> getAlarmList(String alarmToPerson) throws Exception;
}
