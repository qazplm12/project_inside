package com.bitc.project_inside.controller;

import com.bitc.project_inside.data.entity.ProjectEntity;
import com.bitc.project_inside.service.ToyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

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

    // 상세 보기 페이지
    @RequestMapping(value="toyProject/ToyDetail/{projectIdx}", method = RequestMethod.GET)
    public ModelAndView toyDetailGet(@PathVariable("projectIdx") int projectIdx ) throws Exception{

        ModelAndView mv = new ModelAndView("pi/toyDetail");

       ProjectEntity projectBoard = toyService.selectBoard(projectIdx);
        mv.addObject("projectBoard",projectBoard);



        return mv;
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
