package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.PersonEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PersonRepository extends JpaRepository<PersonEntity, Integer> {

//    Optional<PersonEntity> findByPersonId(String personId
////            , boolean b
//    );

    PersonEntity findByPersonId(String personId);

    int countByPersonId(String email);

    int countByPersonNickName(String nickName);

    @Query(value = "SELECT p FROM PersonEntity p WHERE p.personBannedMsg is Null")
    List<PersonEntity> findAllPerson();

    boolean existsByPersonId(String personId);

    PersonEntity findAllByPersonId(String personId);

//    int findAllByPersonId(String personId);

    @Query(value = "" +
            "SELECT " +
            "    RANK() OVER(ORDER BY personTotalScore DESC) AS p_rank " +
            "FROM PersonEntity " +
            "WHERE personId = :userId" +
            "")
    int userRank(@Param("userId") String userId);

    // 아이디 중복 검사

}
