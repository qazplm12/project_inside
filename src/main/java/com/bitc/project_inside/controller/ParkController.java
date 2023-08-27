package com.bitc.project_inside.controller;

import com.bitc.project_inside.data.entity.LikeCheckEntity;
import com.bitc.project_inside.data.entity.MatchingEntity;
import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.data.entity.ProjectEntity;
import com.bitc.project_inside.service.SimService;
import com.bitc.project_inside.service.ToyService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.plaf.PanelUI;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/pi")
public class ParkController {

    @Value("${app.upload-dir}")
    private String uploadDir;

    private final ToyService toyService;
    private final SimService simService;

    // 프로젝트 등록
    @RequestMapping(value = {"/toyProject/ToyRegis"}, method = RequestMethod.GET)
    public String toyProjectGet() throws Exception {
        return "success";
    }

    @RequestMapping(value = "/toyProject/ToyRegis", method = RequestMethod.POST)
    public ResponseEntity<String> toyProjectPost(
            @RequestParam(value = "projectTitle", required = false) String projectTitle,
            @RequestParam(value = "projectThumbnail", required = false) MultipartFile projectThumbnail,
            @RequestParam(value = "totalPerson") int totalPerson,
            @RequestParam(value = "levels") int levels,
            @RequestParam(value = "content", required = false) String content,
            @RequestParam(value = "projectCode", required = false) String projectCode,
            @RequestParam(value = "personId", required = false) String personId,
            @RequestParam(value = "personNickName", required = false) String personNickName
    ) {

        try {
            ProjectEntity projectEntity = new ProjectEntity();

            projectEntity.setProjectTitle(projectTitle); // 프로젝트명
            projectEntity.setProjectMember(totalPerson); // 인원수
            projectEntity.setProjectLevel(levels); // 레벨
            projectEntity.setProjectContent(content); // 상세 보깁
            projectEntity.setProjectLanguage(projectCode); // 기술 스택
            projectEntity.setProjectLeaderId(personId);
            projectEntity.setPersonNickName(personNickName);

            MultipartFile ProjectThumbnail = projectThumbnail;
            String projectImagePath = saveProjectImage(ProjectThumbnail);
            projectEntity.setProjectThumbnail(projectImagePath);

            toyService.insertToyProject(projectEntity);

            return ResponseEntity.status(HttpStatus.OK).body("프로젝트 등록 성공");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로젝트 등록 실패");
        }
    }

    // 프로젝트 리스트
    @RequestMapping(value = "toyProject/ToyListBoard", method = RequestMethod.GET)
    public List<ProjectEntity> toyListBoardGet() throws Exception {

//        @RequestParam String[] keyword
//        if(keyword != null){
//            List<String> keywords = Arrays.asList(keyword);
//            return toyService.searchListProject(keywords);
//        }
            return toyService.selectListProject();
    }

    // 프로젝트 최신 순 버튼 클릭시 내림차순
    @ResponseBody
    @RequestMapping(value = "toyProject/Latest", method = RequestMethod.POST)
    public List<ProjectEntity> latestPost() throws Exception {
        return toyService.latestProject();
    }

    // 프로젝트 최신 순 버튼 클리시 올림차순
    @ResponseBody
    @RequestMapping(value = "toyProject/ReLatest", method = RequestMethod.POST)
    public List<ProjectEntity> ReLatestPost() throws Exception {
        return toyService.reLatestPost();
    }

    // 프로젝트 좋아요 순 버튼 클릭시
    @ResponseBody
    @RequestMapping(value = "toyProject/likeLatest", method = RequestMethod.POST)
    public List<ProjectEntity> likeLatestPost() throws Exception {
        return toyService.likeLatestPost();
    }

    @ResponseBody
    @RequestMapping(value = "toyProject/likeMinLatest", method = RequestMethod.POST)
    public List<ProjectEntity> likeMinLatestPost() throws Exception {
        return toyService.likeMinLatestPost();
    }

    // 프로젝트 좋아요 클릭시 숫자 변환
    @ResponseBody
    @RequestMapping(value = "toyProject/likePlusProjectCheck", method = RequestMethod.POST)
    public void likePost(@RequestBody ProjectEntity projectEntity) throws Exception {
        int projectIdx = projectEntity.getProjectIdx();
        System.out.println("+1 타나");
        toyService.likePlusProjectLike(projectIdx);
    }

    @ResponseBody
    @RequestMapping(value = "toyProject/likeMinProjectCheck", method = RequestMethod.POST)
    public void minLikePost(@RequestBody ProjectEntity projectEntity) throws Exception {
        System.out.println("123::" + projectEntity.getProjectIdx());
        int projectIdx = projectEntity.getProjectIdx();
        toyService.likeMinProjectLike(projectIdx);
    }

    // 찜 순 클릭시
    @ResponseBody
    @RequestMapping(value = "toyProject/likeUpCheck", method = RequestMethod.POST)
    public List<ProjectEntity> likeUpPost() throws Exception {
        return toyService.likeUpToy();
    }

    @ResponseBody
    @RequestMapping(value = "toyProject/likeDownCheck", method = RequestMethod.POST)
    public List<ProjectEntity> likeDownPost() throws Exception {
        return toyService.likeDownToy();
    }

//    // 검색기능
//    @ResponseBody
//    @RequestMapping(value = "toyProject/codeSearch", method = RequestMethod.POST)
//    public List<ProjectEntity> searchPost(@RequestParam("keyword") String keyword) throws Exception {
//        return toyService.toyProjectSearch(keyword);
//    }


    // side profile(사이드 프로필)
    @ResponseBody
    @RequestMapping(value = "toyProject/sideProfile", method = RequestMethod.POST)
    public PersonEntity sideProfileGet(@RequestBody String userInfo) throws Exception {
        System.out.println("com in value email??" + userInfo);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(userInfo);
            String personId = jsonNode.get("userInfo").get("personId").asText();
            System.out.println("personId 값이 잘 들어 왔는지 확인 :" + personId);
            return toyService.sideProfile(personId);
        } catch (Exception e) {
            System.out.println("이메일 정보가 없습니다." + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }

    // 상세 보기 페이지 http://localhost:3000/pi/toyDetail/12
    @RequestMapping(value = "toyProject/toyDetail/{projectIdx}", method = RequestMethod.GET)
    public Optional<ProjectEntity> toyDetailGet(@PathVariable int projectIdx) throws Exception {

        return toyService.toyProjectSelect(projectIdx);
    }

    // 참여 신청
    @ResponseBody
    @RequestMapping(value = "toyProject/projectApplication", method = RequestMethod.POST)
    public MatchingEntity applicationPost(
            @RequestParam(value = "projectIdx") int projectIdx,
            @RequestParam(value = "projectLeaderId") String projectLeaderId,
            @RequestParam(value = "matchingMemberNick") String matchingMemberNick
    ) throws Exception {
        System.out.println(projectIdx + projectLeaderId + matchingMemberNick);

        // 알림 생성
        PersonEntity leader = simService.getUserInfo(projectLeaderId);
        ProjectEntity project = simService.getProjectInfo(projectIdx);
        simService.makeAlarm(leader.getPersonNickName(), project.getProjectTitle(), matchingMemberNick, "projectReq", String.valueOf(projectIdx));

        return toyService.matchingPart(projectIdx, projectLeaderId, matchingMemberNick);
    }

    // 참여 취소
    @ResponseBody
    @RequestMapping(value = "toyProject/projectCancel", method = RequestMethod.POST)
    public MatchingEntity cancelPost(
            @RequestParam(value = "projectIdx") int projectIdx,
            @RequestParam(value = "matchingMemberNick") String matchingMemberNick
    ) throws Exception {

        // projectIdx와 memberNick으로 해당되는 matchingEntity 가져오기
        MatchingEntity matchingEntity = simService.getMatchingInfo(projectIdx, matchingMemberNick);
        // 가져온 MatchingEntity 객체에 상태값 변경후 다시 save해주기
        simService.cancelRequest(matchingEntity.getMatchingIdx());
        // 위의 서비스에서 이미 상태값을 변경해줬지만 리턴이 없어서 다시 세팅해줌 (귀찮아서)
        matchingEntity.setMatchingMemberAccept("2");

        // 상태값을 이용해야하기 때문에 엔티티 리턴해줌
        return matchingEntity;
    }

    // 좋아요 유지 설정
    @ResponseBody
    @RequestMapping(value = "toyProject/likePlus", method = RequestMethod.POST)
    public LikeCheckEntity likeCheckPost(
            @RequestParam(value = "projectIdx") int projectIdx,
            @RequestParam(value = "personId") String personId
    ) throws Exception {
        return toyService.likeCheck(projectIdx, personId);
    }

    // 클릭시 해재 설정
    @ResponseBody
    @RequestMapping(value = "toyProject/likeMin", method = RequestMethod.POST)
    public List<LikeCheckEntity> minCheckPost(
            @RequestParam(value = "projectIdx") int projectIdx,
            @RequestParam(value = "personId") String personId
    ) throws Exception {

        return toyService.minCheck(projectIdx, personId);
    }

    // 좋아요 유지 화면에 보여주기
    @ResponseBody
    @RequestMapping(value = "toyProject/likePlusView", method = RequestMethod.POST)
    public List<LikeCheckEntity> plusViewPost(@RequestParam(value = "personId") String personId) throws Exception {
        return toyService.plusView(personId, 1);
    }

    // 좋아요 해지 설정
    @ResponseBody
    @RequestMapping(value = "toyProject/likeMinView", method = RequestMethod.POST)
    public List<LikeCheckEntity> minViewPost(@RequestParam(value = "personId") String personId) throws Exception {

        return toyService.minView(personId, 0);
    }

    // 프로젝트 유무 확인

    @ResponseBody
    @RequestMapping(value = "toyProject/projectNullCheck", method = RequestMethod.POST)
    public int projectCheckPost(@RequestParam(value = "personNickName") String personNickName) throws Exception {

        return toyService.projectCheck(personNickName);
    }

    // 프로젝트 이미지를 저장하는 메서드1
    private String saveProjectImage(MultipartFile image) {

        String toyThumbnailFile = image.getOriginalFilename();
        String fileExtension = toyThumbnailFile.substring(toyThumbnailFile.lastIndexOf(".") + 1);
        String fileName = generateRandomFileName() + "." + fileExtension;
        String savedImagePath = uploadDir + File.separator + fileName;

        try {
            byte[] imageData = image.getBytes();
            ;
            File imageFile = new File(savedImagePath);

            try (FileOutputStream fos = new FileOutputStream(imageFile)) {
                fos.write(imageData);
            }

            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private String generateRandomFileName() {
        return System.currentTimeMillis() + "_" + Math.random();
    }

}
