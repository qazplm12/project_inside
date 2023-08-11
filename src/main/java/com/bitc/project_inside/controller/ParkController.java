package com.bitc.project_inside.controller;

import com.bitc.project_inside.data.DTO.ProjectRequest;
import com.bitc.project_inside.data.entity.ProjectEntity;
import com.bitc.project_inside.service.ParkService;
import com.bitc.project_inside.service.ToyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/pi")
public class ParkController {

    private final ToyService toyService;

    @RequestMapping(value={"/toyProject/ToyRegis"}, method = RequestMethod.GET)
    public String toyProjectGet() throws Exception{
        return "success";
    }

    @RequestMapping(value = "/toyProject/ToyRegis", method = RequestMethod.POST)
    public ResponseEntity<String> toyProjectPost(
            @RequestParam(value = "projectTitle", required = false) String projectTitle,
            @RequestParam(value="projectThumbnail", required = false) MultipartFile projectThumbnail,
            @RequestParam(value = "totalPerson", required = false) int totalPerson,
            @RequestParam(value = "levels", required = false) int levels,
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

            // 프로젝트 이미지를 저장하고 그 경로를 엔티티에 설정합니다.
            MultipartFile ProjectThumbnail = projectThumbnail;
            String projectImagePath = saveProjectImage(ProjectThumbnail);
            projectEntity.setProjectThumbnail(projectImagePath);

                toyService.insertToyProject(projectEntity);

            return ResponseEntity.status(HttpStatus.OK).body("프로젝트 등록 성공");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("프로젝트 등록 실패");
        }
    }

    @RequestMapping(value="toyProject/ToyDetail/{projectIdx}", method = RequestMethod.GET)
    public ModelAndView toyDetailGet(@PathVariable("projectIdx") int projectIdx ) throws Exception{

        ModelAndView mv = new ModelAndView("pi/toyDetail");

       ProjectEntity projectBoard = toyService.selectBoard(projectIdx);
        mv.addObject("projectBoard",projectBoard);



        return mv;
    }


    // 프로젝트 이미지를 저장하는 메서드
    private String saveProjectImage(MultipartFile image) {

        String savedImagePath = "C:\\Users\\admin\\Desktop\\pro\\project_inside\\src\\main\\project_inside_react\\src\\images\\" + generateRandomFileName() + ".jpg";
        return savedImagePath;
    }

    private String generateRandomFileName() {
        // 랜덤한 파일 이름을 생성하는 로직을 구현합니다.
        // 예시로 현재 시간과 랜덤 숫자를 조합하여 파일 이름을 생성하는 로직을 가정합니다.
        return System.currentTimeMillis() + "_" + Math.random();
    }

}
