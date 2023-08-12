package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.AlarmEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AlarmRepository extends JpaRepository<AlarmEntity, Integer> {

    List<AlarmEntity> findByAlarmToPersonOrderByAlarmIdxDesc(String alarmToPerson);
}
