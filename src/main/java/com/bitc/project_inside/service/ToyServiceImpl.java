package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.ProjectEntity;
import com.bitc.project_inside.data.repository.PersonRepository;
import com.bitc.project_inside.data.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ToyServiceImpl implements  ToyService{

    private final ProjectRepository projectRepository;
    private final PersonRepository personRepository;


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
        System.out.println("Plus idx값 확인"+projectIdx);
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
        System.out.println("Min idx값 확인"+projectIdx);
        try{
            projectRepository.likeMinProjectLike(projectIdx);
        }
        catch (Exception e){
            System.out.println("마이너스 에러 사유"+e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public List<ProjectEntity> likeUpToy() throws Exception {
        return projectRepository.findAllByOrderByProjectLikeDesc();
    }

    @Override
    public List<ProjectEntity> likeDownToy() throws Exception {
        return projectRepository.findAllByOrderByProjectLikeAsc();
    }

    @Override
    public Optional<ProjectEntity> toyProjectSelect(int projectIdx) throws Exception {
        return projectRepository.findById(projectIdx);
    }

    @Override
    public List<ProjectEntity> toyProjectSearch(String keyword) throws Exception {
        return projectRepository.findProjectsByProjectLanguageContaining(keyword);
    }

    @Override
    public int sideProfile(String personId) throws Exception {
        return 0;
    }


//    @Override
//    public List<PersonEntity> sideProfile(int personId) throws Exception {
//
////        System.out.println("이메일 정보1::"+personId);
////        try{
////        System.out.println("이메일 정보2::"+personId);
//////        return personRepository.countByPersonId(personId);
////        }
////        catch (Exception e){
////            System.out.println("사이드 프로필에서 에러가 발생"+e.getMessage());
////            e.printStackTrace();
////        }
//        return null;
//    }

    // 사이드 프로필 정보

}
