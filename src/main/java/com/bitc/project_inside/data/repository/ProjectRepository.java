package com.bitc.project_inside.data.repository;


import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.data.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository

public interface ProjectRepository extends JpaRepository<ProjectEntity, Integer> {
    List<ProjectEntity> findAllByOrderByProjectDateDesc();

    List<ProjectEntity> findAllByOrderByProjectDateAsc();

    @Modifying
    @Transactional
    @Query("UPDATE ProjectEntity p SET p.projectLike = p.projectLike + 1 WHERE p.projectIdx = :projectIdx")
    void likePlusProjectLike(@Param("projectIdx")int projectIdx);

    @Modifying
    @Transactional
    @Query("UPDATE ProjectEntity p SET p.projectLike = p.projectLike - 1 WHERE p.projectIdx = :projectIdx")
    void likeMinProjectLike(@Param("projectIdx")int projectIdx);

    List<ProjectEntity> findAllByOrderByProjectLikeDesc();

    List<ProjectEntity> findAllByOrderByProjectLikeAsc();

    List<ProjectEntity> findProjectsByProjectLanguageContaining(String keyword);

}
