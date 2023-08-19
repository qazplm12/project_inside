package com.bitc.project_inside.service;

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
//        return
        return projectRepository.findAllByOrderByProjectDateDesc();
    }

    @Override
    public List<ProjectEntity> latestProject() throws Exception {
        return projectRepository.findAllByOrderByProjectDateDesc();
    }

    @Override
    public List<ProjectEntity> reLatestPost() throws Exception {
        return projectRepository.findAllByOrderByProjectDateAsc();
    }

    @Override
    public void likePlusProjectLike(int projectIdx) throws Exception {
        try{
            projectRepository.likePlusProjectLike(projectIdx);
        }
        catch (Exception e){
            System.out.println("플러스 에러 사유"+e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void likeMinProjectLike(int projectIdx) throws Exception {
        try{
            projectRepository.likeMinProjectLike(projectIdx);
        }
        catch (Exception e){
            System.out.println("마이너스 에러 사유"+e.getMessage());
            e.printStackTrace();
        }
    }
}
