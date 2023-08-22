package com.bitc.project_inside.data.repository;



import com.bitc.project_inside.data.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PersonRepository extends JpaRepository<PersonEntity, Integer> {

    PersonEntity findByPersonId(String username);

    int countByPersonId(String email);

    int countByPersonNickName(String nickName);

    @Query(value = "SELECT p FROM PersonEntity p")
    List<PersonEntity> findAllPerson();

    // 아이디 중복 검사

    // ========================================
    // 사용자 ID 존재 여부 확인
    boolean existsByPersonId(String personId);

}
