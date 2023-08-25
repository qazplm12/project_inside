package com.bitc.project_inside.data.repository;

import com.bitc.project_inside.data.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

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

    @Query(value = "SELECT personId FROM PersonEntity ORDER BY personTotalScore DESC ")
    List<String> userRank();

    @Query(value = "" +
            "SELECT " +
            "    RANK() OVER(ORDER BY personTotalScore DESC) AS ranked " +
            "FROM PersonEntity " +
            "")
    List<Integer> numRank();

    @Modifying
    @Query(value = "UPDATE PersonEntity SET personLevel = :i, personTotalScore = :score WHERE personNickName = :userNick")
    void levelUp(int i, int score, String userNick);

    @Modifying
    @Query(value = "UPDATE PersonEntity SET personTotalScore = :score WHERE personNickName = :userNick")
    void updateTotalScore(int score, String userNick);

    PersonEntity findByPersonNickName(String matchingMemberNick) throws Exception;

    // 아이디 중복 검사

}
