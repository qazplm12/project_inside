package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.ProjectEntity;

import java.util.List;

public interface ToyService {
    void insertToyProject(ProjectEntity projectEntity) throws Exception;

    ProjectEntity selectBoard(int projectIdx) throws Exception;

    List<ProjectEntity> selectListProject() throws Exception;

    List<ProjectEntity> latestProject() throws Exception;

    List<ProjectEntity> reLatestPost() throws Exception;

    public void likePlusProjectLike(int projectIdx) throws Exception;

    public void likeMinProjectLike(int projectIdx) throws Exception;
}
