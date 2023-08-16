package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.AlarmEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AlarmRepository extends JpaRepository<AlarmEntity, Integer> {

    List<AlarmEntity> findByAlarmToPersonOrderByAlarmIdxDesc(String alarmToPerson);

    @Modifying
    @Transactional
    @Query(value = "UPDATE AlarmEntity a SET a.alarmChecked = 'A' WHERE a.alarmToPerson = :alarmToPerson AND a.alarmChecked = 'N' ")
    void readAlarmList(@Param("alarmToPerson") String alarmToPerson);

    @Modifying
    @Transactional
    @Query(value = "UPDATE AlarmEntity a SET a.alarmChecked = 'Y' WHERE a.alarmIdx = :alarmIdx ")
    void readAlarm(@Param("alarmIdx") int alarmIdx);
}
