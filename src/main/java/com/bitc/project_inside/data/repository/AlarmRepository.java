package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.AlarmEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlarmRepository extends JpaRepository<AlarmEntity, Integer> {

}
