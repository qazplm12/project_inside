package com.bitc.project_inside.service;

import com.bitc.project_inside.data.DTO.ProjectRequest;
import com.bitc.project_inside.data.entity.ProjectEntity;
import com.bitc.project_inside.data.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ToyServiceImpl implements  ToyService{

    private final ProjectRepository projectRepository;


    @Override
    public void insertToyProject(ProjectEntity projectEntity) throws Exception {
        projectRepository.save(projectEntity);
    }

    @Override
    public ProjectEntity selectBoard(int projectIdx) throws Exception {
        return (ProjectEntity) projectRepository.findAllById(Collections.singleton(projectIdx));
    }


    @Override
    public List<ProjectEntity> selectListProject() throws Exception {
        return projectRepository.findAll();
    }
}
