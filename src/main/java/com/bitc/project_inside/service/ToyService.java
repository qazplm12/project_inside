package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.ProjectEntity;

public interface ToyService {
    void insertToyProject(ProjectEntity projectEntity) throws Exception;

    ProjectEntity selectBoard(int projectIdx) throws Exception;
}
