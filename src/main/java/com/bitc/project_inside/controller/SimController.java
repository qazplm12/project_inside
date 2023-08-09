package com.bitc.project_inside.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/simServer")
public class SimController {

    // 계정 정보 변경
    @RequestMapping(value = "/updatePersonInfo", method = RequestMethod.PUT)
    public void updatePersonInfo(
            @RequestParam(value = "personPassword", required = false) String personPassword,
            @RequestParam(value = "personLanguage", required = false) String personLanguage
    ) throws Exception {
        System.out.println("/updatePersonInfo 서버");



        // 프로필 사진 변경일때(우선순위 low)
        if (personPassword != null) {
            System.out.println("personPassword : " + personPassword);
            // 비밀번호 변경일때

            // 로그인 정보 받아와서 personEntity 객체 생성

            // 매개변수를 personEntity 에 추가
//            simService.
        } else if (personLanguage != null) {
            System.out.println("personLanguage : " + personLanguage);
            // 사용언어 변경일때

        }

        // entity를 repository 통해서 save하기



    }


}
