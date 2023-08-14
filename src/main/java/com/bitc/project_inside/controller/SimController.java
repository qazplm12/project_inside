package com.bitc.project_inside.controller;

import com.bitc.project_inside.data.entity.AlarmEntity;
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

    // 계정 정보 변경
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

    @RequestMapping(value="/getAlarmList", method = RequestMethod.POST)
    public List<AlarmEntity> getAlarmList(
            @RequestParam(value = "alarmToPerson") String alarmToPerson
    ) throws Exception {
        System.out.println("--------- /getAlarmList 서버 --------");
        System.out.println("alarmToPerson : " + alarmToPerson);

        return simService.getAlarmList(alarmToPerson);
    }

    @RequestMapping(value="/sendInquiry", method = RequestMethod.POST)
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
    @RequestMapping(value="/updateInquiry", method = RequestMethod.POST)
    public void updateInquiry(
            @RequestParam(value = "inquiryIdx") int idx,
            @RequestParam(value = "inquiryContent") String content
    ) throws Exception {
        System.out.println("------ /updateInquiry 서버 ------");

        System.out.println("inquiryidx : " + idx);
        System.out.println("inquiryContent : " + content);

    }


    @RequestMapping(value="/sendAnswer", method = RequestMethod.POST)
    public void sendAnswer(
            @RequestParam(value = "inquiryIdx") int inquiryIdx,
            @RequestParam(value = "inquiryAnswer") String answer,
            @RequestParam(value = "inquiryPersonNick") String alarmToPerson
    ) throws Exception {
//        System.out.println("/sendAnswer 서버 : " + answer);
//        simService.makeAlarm(alarmToPerson, "admin", "inquiry");

    }

    @RequestMapping(value="/banningPerson", method = RequestMethod.POST)
    public void banningPerson(
            String personNickName,
            String personBannedMsg
    ) throws Exception {
        System.out.println("---- /banningPerson 서버 ---- ");

        System.out.println("personNickName : " + personNickName);
        System.out.println("personBannedMsg: " + personBannedMsg);

    }


}
