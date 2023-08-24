package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.MatchingEntity;
import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.data.entity.ProjectEntity;
import com.bitc.project_inside.data.repository.MatchingRepository;
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
    private final MatchingRepository matchingRepository;


    @Override
    public void insertToyProject(ProjectEntity projectEntity) throws Exception {
        //1. project 가 save 가 된후
        projectRepository.save(projectEntity);

        // 이건 들고 오는거 확인
        System.out.println("project"+projectEntity.getProjectIdx());

        // 이걸 가져 온 이유는 닉네임이 저장되게 해야 한다.
        PersonEntity personEntity = new PersonEntity();
        // 이건 안들고 오던데 ...
        System.out.println("person"+personEntity.getPersonNickName());


        // MatchingEntity 에 리더 닉네임과 프로젝트 번호가 저장이 되어야 한다.
        MatchingEntity insertMatching = new MatchingEntity();

        //insertMatching 에 저장 시켜야 된다 default





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
    public PersonEntity sideProfile(String personId) throws Exception {
        return personRepository.findAllByPersonId(personId);
    }

    @Override
    public MatchingEntity matchingPart(int projectIdx, String matchingMemberNick, String matchingLeaderNick) throws Exception {

        MatchingEntity project = new MatchingEntity();
        project.setMatchingProjectIdx(projectIdx);
        project.setMatchingMemberNick(matchingMemberNick);
        project.setMatchingMemberAccept("1");
        project.setMatchingLeaderNick(matchingLeaderNick);

        return matchingRepository.save(project);
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
