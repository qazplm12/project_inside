package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.LikeCheckEntity;
import com.bitc.project_inside.data.entity.MatchingEntity;
import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.data.entity.ProjectEntity;
import com.bitc.project_inside.data.repository.LikeCheckRepository;
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
public class ToyServiceImpl implements  ToyService {

    private final ProjectRepository projectRepository;
    private final PersonRepository personRepository;
    private final MatchingRepository matchingRepository;
    private final LikeCheckRepository likeCheckRepository;


    @Override
    public void insertToyProject(ProjectEntity projectEntity) throws Exception {
        //1. project 가 save 가 된후
        projectRepository.save(projectEntity);

        // 이건 들고 오는거 확인
        System.out.println("project" + projectEntity.getProjectIdx());
        System.out.println("name" + projectEntity.getPersonNickName());

        // MatchingEntity 에 리더 닉네임과 프로젝트 번호가 저장이 되어야 한다.
        //insertMatching 에 저장 시켜야 된다 default
        MatchingEntity insertMatching = new MatchingEntity();
        insertMatching.setMatchingLeaderNick(projectEntity.getPersonNickName());
        insertMatching.setMatchingProjectIdx(projectEntity.getProjectIdx());
        matchingRepository.save(insertMatching);

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
        System.out.println("Plus idx값 확인" + projectIdx);
        try {
            projectRepository.likePlusProjectLike(projectIdx);
        } catch (Exception e) {
            System.out.println("플러스 에러 사유" + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void likeMinProjectLike(int projectIdx) throws Exception {
        System.out.println("Min idx값 확인" + projectIdx);
        try {
            projectRepository.likeMinProjectLike(projectIdx);
        } catch (Exception e) {
            System.out.println("마이너스 에러 사유" + e.getMessage());
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
    public MatchingEntity matchingPart(int projectIdx, String projectLeaderId, String matchingMemberNick) throws Exception {

        MatchingEntity project = new MatchingEntity();
        project.setMatchingProjectIdx(projectIdx);

        PersonEntity leaderInfo = personRepository.findByPersonId(projectLeaderId);
        project.setMatchingLeaderNick(leaderInfo.getPersonNickName());
        project.setMatchingMemberAccept("1");
        project.setMatchingMemberNick(matchingMemberNick);

        return matchingRepository.save(project);
    }

    @Override
    public LikeCheckEntity likeCheck(int projectIdx, String personId) throws Exception {

        LikeCheckEntity likePlusCheck = new LikeCheckEntity();
        likePlusCheck.setProjectIdx(projectIdx);
        likePlusCheck.setMemberId(personId);
        likePlusCheck.setLikeCheck(1);

        return likeCheckRepository.save(likePlusCheck);
    }

    @Override
    public List<LikeCheckEntity> plusView(String personId, int i) throws Exception {
        return likeCheckRepository.findByMemberIdAndLikeCheck(personId, 1);
    }

    @Override
    public List<LikeCheckEntity> minView(String personId, int i) throws Exception {
        return likeCheckRepository.findByMemberIdAndLikeCheck(personId, 0);
    }

    @Override
    public List<LikeCheckEntity> minCheck(int projectIdx, String personId) throws Exception {

        LikeCheckEntity likePlusCheck = new LikeCheckEntity();
        likePlusCheck.setProjectIdx(projectIdx);
        likePlusCheck.setMemberId(personId);
        likePlusCheck.setLikeCheck(0);

        System.out.println("0의 자리로 타나요");

        return likeCheckRepository.findByMemberIdAndLikeCheck(personId, 0);
    }

    @Override
    public int projectCheck(String personNickName) throws Exception {

        int num = matchingRepository.countByMatchingLeaderNick(personNickName);
        System.out.println("num"+num);
        if(num > 0){
            return 0;
        }
        else if(num == 0){
            return 1;
        }
//
        return 0;
    }

    @Override
    public List<ProjectEntity> likeLatestPost() throws Exception {
        return projectRepository.findAllByOrderByProjectLikeDesc();
    }

    @Override
    public List<ProjectEntity> likeMinLatestPost() throws Exception {
        return projectRepository.findAllByOrderByProjectLikeAsc();
    }

//    @Override
//    public LikeCheckEntity likeMinCheck(int projectIdx, String personId) throws Exception {
//
//        LikeCheckEntity likePlusCheck = new LikeCheckEntity();
//        likePlusCheck.setProjectIdx(projectIdx);
//        likePlusCheck.setMemberId(personId);
//        likePlusCheck.setLikeCheck(0);
//
//        return likeCheckRepository.save(likePlusCheck);
//    }


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
