package com.bitc.project_inside.controller;

import com.bitc.project_inside.data.entity.AlarmEntity;
import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.data.entity.ProjectEntity;
import com.bitc.project_inside.service.SimService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/simServer")
public class SimController {

    private final SimService simService;

    // 계정 관련
    @RequestMapping(value = "/updatePersonInfo", method = RequestMethod.POST)
    public void updatePersonInfo(
            @RequestParam(value = "personProfileImg", required = false) MultipartFile personProfileImg,
            @RequestParam(value = "personNickName", required = false) String personNickName,
            @RequestParam(value = "personPassword", required = false) String personPassword,
            @RequestParam(value = "personLanguage", required = false) String personLanguage
    ) throws Exception {
        System.out.println("/updatePersonInfo 서버");


        if (personProfileImg != null) {
            System.out.println("personProfileImg : " + personProfileImg);
            // 프로필 사진 변경일때

            // 로그인 정보 받아와서 personEntity 객체 생성

            // 매개변수(파일 경로정보)를 personEntity 에 추가

            // public/image 폴더에 실제 파일 저장하는 과정

        }
        if (personNickName != null) {
            System.out.println("personNickName : " + personNickName);
            // 닉네임 변경일때

        }

        if (personPassword != null) {
            System.out.println("personPassword : " + personPassword);
            // 비밀번호 변경일때

            // 로그인 정보 받아와서 personEntity 객체 생성

            // 매개변수를 personEntity 에 추가

        }

        if (personLanguage != null) {
            System.out.println("personLanguage : " + personLanguage);
            // 사용언어 변경일때

        }

        // entity를 repository 통해서 save하기


    }

    @RequestMapping(value = "/banningPerson", method = RequestMethod.POST)
    public void banningPerson(
            String personNickName,
            String personBannedMsg
    ) throws Exception {
        System.out.println("---- /banningPerson 서버 ---- ");

        System.out.println("personNickName : " + personNickName);
        System.out.println("personBannedMsg: " + personBannedMsg);

    }

    // 알림 관련
    @RequestMapping(value = "/getAlarmList", method = RequestMethod.POST)
    public List<AlarmEntity> getAlarmList(
            @RequestParam(value = "alarmToPerson") String alarmToPerson
    ) throws Exception {
        System.out.println("--------- /getAlarmList 서버 --------");
        System.out.println("alarmToPerson : " + alarmToPerson);

        return simService.getAlarmList(alarmToPerson);
    }

    @RequestMapping(value = "/readAlarm", method = RequestMethod.POST)
    public void readAlarm(
            @RequestParam(value = "alarmIdx") int alarmIdx
    ) throws Exception {
        System.out.println("--------- /readAlarm 서버 --------");
        System.out.println("alarmToPerson : " + alarmIdx);

        simService.readAlarm(alarmIdx);
    }

    @RequestMapping(value = "/readAlarmList", method = RequestMethod.POST)
    public void readAlarmList(
            @RequestParam(value = "alarmToPerson") String alarmToPerson
    ) throws Exception {
        System.out.println("--------- /readAlarmList 서버 --------");
        System.out.println("alarmToPerson : " + alarmToPerson);

        simService.readAlarmList(alarmToPerson);
    }

    
    // 문의사항 관련
    
    @RequestMapping(value = "/sendInquiry", method = RequestMethod.POST)
    public void sendInquiry(
            @RequestParam(value = "inquiryTitle") String title,
            @RequestParam(value = "inquiryCategory") String category,
            @RequestParam(value = "inquiryContent") String content
    ) throws Exception {
        System.out.println("/sendInquiry 서버 : ");

        System.out.println("inquiryTitle : " + title);
        System.out.println("inquiryCategory : " + category);
        System.out.println("inquiryContent : " + content);

    }

    @RequestMapping(value = "/updateInquiry", method = RequestMethod.POST)
    public void updateInquiry(
            @RequestParam(value = "inquiryIdx") int idx,
            @RequestParam(value = "inquiryContent") String content
    ) throws Exception {
        System.out.println("------ /updateInquiry 서버 ------");

        System.out.println("inquiryIdx : " + idx);
        System.out.println("inquiryContent : " + content);

    }


    @RequestMapping(value = "/sendInquiryAnswer", method = RequestMethod.POST)
    public void sendInquiryAnswer(
            @RequestParam(value = "inquiryTitle") String inquiryTitle,
            @RequestParam(value = "inquiryIdx") int inquiryIdx,
            @RequestParam(value = "inquiryAnswer") String inquiryAnswer,
            @RequestParam(value = "inquiryPersonNick") String alarmToPerson
    ) throws Exception {
        System.out.println("/sendInquiryAnswer 서버 : " + inquiryAnswer);

        // 답장
        simService.inquiryAnswer(inquiryIdx, inquiryAnswer);

        // 알림
        simService.makeAlarm(alarmToPerson, inquiryTitle,"admin", "inquiry");

    }


    // 관리자 페이지 관련
    @RequestMapping(value = "/getPersonList", method = RequestMethod.POST)
    public List<PersonEntity> getPersonList() throws Exception {
        System.out.println("--------- /getPersonList 서버 --------");


        return simService.getPersonList();
    }


    // 메인 페이지 관련
    @RequestMapping(value = "/getProjectList", method = RequestMethod.POST)
    public List<ProjectEntity> getProjectList() throws Exception {
        System.out.println("--------- /getProjectList 서버 --------");


        return simService.getProjectList();
    }

}
