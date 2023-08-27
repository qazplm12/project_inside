package com.bitc.project_inside.service;

import com.bitc.project_inside.data.entity.LikeCheckEntity;
import com.bitc.project_inside.data.entity.MatchingEntity;
import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.data.entity.ProjectEntity;

import java.util.List;
import java.util.Optional;

public interface ToyService {
    void insertToyProject(ProjectEntity projectEntity) throws Exception;

    ProjectEntity selectBoard(int projectIdx) throws Exception;

    List<ProjectEntity> selectListProject() throws Exception;

    List<ProjectEntity> latestProject() throws Exception;

    List<ProjectEntity> reLatestPost() throws Exception;

    public void likePlusProjectLike(int projectIdx) throws Exception;

    public void likeMinProjectLike(int projectIdx) throws Exception;

    List<ProjectEntity> likeUpToy()throws Exception;

    List<ProjectEntity> likeDownToy() throws Exception;

    Optional<ProjectEntity> toyProjectSelect(int projectIdx) throws Exception;

    PersonEntity sideProfile(String personId) throws Exception;

    MatchingEntity matchingPart(int projectIdx, String projectLeaderId, String matchingMemberNick) throws Exception;

    LikeCheckEntity likeCheck(int projectIdx, String personId) throws Exception;

    List<LikeCheckEntity> plusView(String personId, int i) throws Exception;

    List<LikeCheckEntity> minView(String personId, int i) throws Exception;

    List<LikeCheckEntity> minCheck(int projectIdx, String personId) throws Exception;

    int projectCheck(String personNickName) throws Exception;

    List<ProjectEntity> likeLatestPost() throws Exception;

    List<ProjectEntity> likeMinLatestPost() throws Exception;

    List<ProjectEntity> searchListProject(List<String> keywords) throws Exception;
}
