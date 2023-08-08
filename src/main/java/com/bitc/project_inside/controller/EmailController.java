package com.bitc.project_inside.controller;

import com.bitc.project_inside.data.DTO.PersonRequest;
import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.service.EmailService;
import com.bitc.project_inside.service.SimService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class EmailController {

    private final EmailService emailService;
    private final SimService simService;

    // 이메일 중복 검사 & 이메일 인증 번호 발송
    @RequestMapping(value = "/emailConfirm", method = RequestMethod.POST)
    public String emailConfirm(@RequestParam String email) throws Exception {

        int isUser = simService.isUser(email);

        if (isUser > 0) {
            // 기존 유저
            return String.valueOf(isUser);
        } else {
            // 신규 유저
            return emailService.sendSimpleMessage(email);
        }
    }

    // 닉네임 중복 검사
    @RequestMapping(value = "/checkNick", method = RequestMethod.POST)
    public String checkNick(@RequestParam String nickName) throws Exception {

        return String.valueOf(simService.isNick(nickName));
    }

    // 회원가입
    @RequestMapping(value = "/insertPerson", method = RequestMethod.POST)
    public String insertPerson(PersonEntity person) throws Exception {

        simService.insertPerson(person);
        // insert 완료 후 redirect > 안먹힘
        // 리액트에서 axios나 js로 해결해야 할듯함

        return "";
    }

}