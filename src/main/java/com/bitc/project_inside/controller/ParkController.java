package com.bitc.project_inside.controller;

import com.bitc.project_inside.data.entity.MatchingEntity;
import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.data.entity.ProjectEntity;
import com.bitc.project_inside.service.SimService;
import com.bitc.project_inside.service.ToyService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
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

    // 프로젝트 등록
    @RequestMapping(value={"/toyProject/ToyRegis"}, method = RequestMethod.GET)
    public String toyProjectGet() throws Exception{
        return "success";
    }

    @RequestMapping(value = "/toyProject/ToyRegis", method = RequestMethod.POST)
    public ResponseEntity<String> toyProjectPost(
            @RequestParam(value = "projectTitle", required = false) String projectTitle,
            @RequestParam(value="projectThumbnail", required = false) MultipartFile projectThumbnail,
            @RequestParam(value = "totalPerson") int totalPerson,
            @RequestParam(value = "levels") int levels,
            @RequestParam(value = "content", required = false) String content,
            @RequestParam(value="projectCode", required = false) String projectCode
    ) {

            try{
            ProjectEntity projectEntity = new ProjectEntity();

            projectEntity.setProjectTitle(projectTitle); // 프로젝트명
            projectEntity.setProjectMember(totalPerson); // 인원수
            projectEntity.setProjectLevel(levels); // 레벨
            projectEntity.setProjectContent(content); // 상세 보깁
            projectEntity.setProjectLanguage(projectCode); // 기술 스택

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
    public List<ProjectEntity> toyListBoardGet() throws Exception{

        return toyService.selectListProject();
    }

    // 프로젝트 최신 순 버튼 클릭시 내림차순
    @ResponseBody
    @RequestMapping(value="toyProject/Latest", method = RequestMethod.POST)
    public List<ProjectEntity> latestPost() throws Exception{
        return toyService.latestProject();
    }

    // 프로젝트 최신 순 버튼 클리시 올림차순
    @ResponseBody
    @RequestMapping(value="toyProject/ReLatest", method = RequestMethod.POST)
    public List<ProjectEntity> ReLatestPost() throws Exception{
        return toyService.reLatestPost();
    }

    // 프로젝트 좋아요 클릭시 숫자 변환
    @ResponseBody
    @RequestMapping(value="toyProject/likePlusProjectCheck", method=RequestMethod.POST)
    public void likePost(@RequestBody ProjectEntity projectEntity) throws Exception{
        int projectIdx = projectEntity.getProjectIdx();
        System.out.println("+1 타나");
        toyService.likePlusProjectLike( projectIdx);
    }

    @ResponseBody
    @RequestMapping(value="toyProject/likeMinProjectCheck", method = RequestMethod.POST)
    public void minLikePost( @RequestBody ProjectEntity projectEntity) throws Exception{
        System.out.println("123::"+projectEntity.getProjectIdx());
        int projectIdx = projectEntity.getProjectIdx();
        System.out.println("-1 타나");
        toyService.likeMinProjectLike(projectIdx);
    }

    // 찜 순 클릭시
    @ResponseBody
    @RequestMapping(value="toyProject/likeUpCheck", method = RequestMethod.POST)
    public List<ProjectEntity> likeUpPost()throws Exception{
        return toyService.likeUpToy();
    }

    @ResponseBody
    @RequestMapping(value="toyProject/likeDownCheck", method = RequestMethod.POST)
    public List<ProjectEntity> likeDownPost() throws Exception{
        return toyService.likeDownToy();
    }

    // 검색기능
    @ResponseBody
    @RequestMapping(value="toyProject/codeSearch", method = RequestMethod.POST)
    public List<ProjectEntity> searchPost(@RequestParam("keyword") String keyword) throws Exception{
        System.out.println("검색어 전송 ::" + keyword);
        return toyService.toyProjectSearch(keyword);
    }

    // side profile(사이드 프로필)
    @ResponseBody
    @RequestMapping(value="toyProject/sideProfile",method = RequestMethod.GET)
    public int sideProfileGet(@RequestParam(value = "personId") String personId) throws Exception{
        System.out.println("com in value email??"+personId);
        try{
            return toyService.sideProfile(personId);
        }
        catch (Exception e){
            System.out.println("이메일 정보가 없습니다."+e.getMessage());
            e.printStackTrace();
        }
        return 0;
    }

    // 상세 보기 페이지 http://localhost:3000/pi/toyDetail/12
    @RequestMapping(value="toyProject/toyDetail/{projectIdx}", method = RequestMethod.GET)
    public Optional<ProjectEntity> toyDetailGet(@PathVariable int projectIdx) throws Exception{

        System.out.println("프로젝트 뿌리기");

        return toyService.toyProjectSelect(projectIdx);
    }

    // 참여 신청
    @ResponseBody
    @RequestMapping(value="toyProject/projectApplication", method = RequestMethod.POST)
    public Optional<MatchingEntity> applicationPost() throws Exception{
        return null;
    }

    // 참여 거절
    @ResponseBody
    @RequestMapping(value="toyProject/projectCancel", method = RequestMethod.POST)
    public Optional<MatchingEntity> canselPost() throws Exception{
        return null;
    }

    // 프로젝트 이미지를 저장하는 메서드
    private String saveProjectImage(MultipartFile image) {

        String toyThumbnailFile = image.getOriginalFilename();
        String fileExtension = toyThumbnailFile.substring(toyThumbnailFile.lastIndexOf(".")+1);
        String fileName = generateRandomFileName() + "." + fileExtension;
        String savedImagePath = uploadDir + File.separator + fileName;

        try {
            byte[] imageData = image.getBytes();;
            File imageFile = new File(savedImagePath);

            try(FileOutputStream fos = new FileOutputStream(imageFile)){
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
