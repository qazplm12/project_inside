package com.bitc.project_inside.controller;

import com.bitc.project_inside.data.DTO.PersonRequest;
import com.bitc.project_inside.data.DTO.ResponseDTO;
import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(value = "http://localhost:3000")
@Log4j2
@RequiredArgsConstructor
@RestController
public class EmailController {

    private final EmailService emailService;
    private final PersonService personService;
    private final PersonDetailService personDetailService;
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
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public void signup(
            @RequestParam String personId, @RequestParam String personNickName, @RequestParam String personPassword
    ) throws Exception {
        System.out.println(personId);

        PersonEntity person = PersonEntity.builder().build();

        person.setPersonId(personId);
        person.setPersonPassword(personPassword);
        person.setPersonNickName(personNickName);

//        simService.insertPerson(person);
        simService.save(person);

    }

    // 로그인
//    @RequestMapping(value = "/login", method = RequestMethod.POST)
//    public void login(
//            @RequestParam String personId,
//            @RequestParam String personPassword
//    ) throws Exception {
//
//        System.out.println(personId);
//        System.out.println(personPassword);
//
//
////        System.out.println(person);
//
//        UserDetails person = personDetailService.loadUserByUsername(personId);
//
//        System.out.println("asdfasdgad : " + person);
//
//
//    }

}