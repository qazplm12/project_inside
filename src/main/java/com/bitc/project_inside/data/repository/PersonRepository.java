package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.MatchingEntity;
import com.bitc.project_inside.data.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<PersonEntity, Integer> {


    Optional<PersonEntity> findByPersonId(String email);
}
