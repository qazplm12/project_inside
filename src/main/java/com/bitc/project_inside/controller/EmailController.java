package com.bitc.project_inside.controller;

import com.bitc.project_inside.data.DTO.PersonRequest;
import com.bitc.project_inside.data.DTO.ResponseDTO;
import com.bitc.project_inside.data.entity.PersonEntity;
import com.bitc.project_inside.security.TokenProvider;
import com.bitc.project_inside.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
public class EmailController {

    private final EmailService emailService;
    private final PersonService personService;
    //    private final PersonDetailService personDetailService;
    private final SimService simService;
    private final TokenProvider tokenProvider;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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

    // 비밀번호 중복 검사
    @RequestMapping(value = "/checkPassword", method = RequestMethod.POST)
    public String checkPassword(
            @RequestParam String personId,
            @RequestParam String personPassword
    ) throws Exception {

        PersonEntity person = simService.getUserInfo(personId);

        return String.valueOf(simService.isPassword(person.getPassword(), personPassword, passwordEncoder));
    }

    //  회원 가입
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody PersonRequest personRequest) {
        try {
//      회원 가입 정보 확인, 비밀번호 확인, 정보 오류 시 에러 발생
            if (personRequest == null || personRequest.getPersonPassword() == null) {
                throw new RuntimeException("Invalid Password value.");
            }
            // 요청을 이용해 저장할 유저 만들기
            PersonEntity person = PersonEntity.builder()
                    .personId(personRequest.getPersonId())
                    .personPassword(passwordEncoder.encode(personRequest.getPersonPassword()))
                    .personNickName(personRequest.getPersonNickName())
                    .build();
            // 서비스를 이용해 리포지터리에 유저 저장
            PersonEntity registeredUser = personService.create(person);
            PersonRequest responseUserDTO = PersonRequest.builder()
                    .personId(registeredUser.getPersonId())
                    .personPassword(registeredUser.getPersonPassword())
                    .personNickName(registeredUser.getPersonNickName())
                    .build();

            return ResponseEntity.ok().body(responseUserDTO);
        } catch (Exception e) {
            // 유저 정보는 항상 하나이므로 리스트로 만들어야 하는 ResponseDTO를 사용하지 않고 그냥 UserDTO 리턴.

            ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
            return ResponseEntity
                    .badRequest()
                    .body(responseDTO);
        }
    }

    // 사이트 사용 인증 정보 확인
    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody PersonRequest personRequest) {
        // 서비스를 사용하여 사용자 인증 정보 가져오기
        System.out.println(personRequest);
        PersonEntity person = personService.getByCredentials(
                personRequest.getPersonId(),
                personRequest.getPersonPassword(),
                passwordEncoder);

            if (person != null) {
                if (person.getPersonBannedMsg() != null) {
                    // 차단당한 유저인 경우 HTTP 상태 코드와 데이터를 클라이언트로 전송
                    ResponseDTO responseDTO = ResponseDTO.builder()
                            .error(person.getPersonBannedMsg())
                            .build();
                    return ResponseEntity
                            .badRequest()
                            .body(responseDTO);
                }
                // 웹 토큰 생성기로 토큰 생성
                final String token = tokenProvider.create(person);
//      UserDTO 타입으로 사용자 ID/PW, 토큰 정보 저장
                final PersonRequest responseUserDTO = PersonRequest.builder()
                        .personId(person.getPersonId())
                        .personIdx(person.getPersonIdx())
                        .personPassword(person.getPersonPassword())
                        .personNickName(person.getPersonNickName())
                        .personLanguage(person.getPersonLanguage())
                        .personJoinDt(person.getPersonJoinDt())
                        .personLevel(person.getPersonLevel())
                        .personTotalScore(person.getPersonTotalScore())
                        .personImgPath(person.getPersonImgPath())
                        .personBannedMsg(person.getPersonBannedMsg())
                        .personPasswordUpdateDt(person.getPersonPasswordUpdateDt())
                        .token(token)
                        .build();

//      ResponseEntity : HTTP 상태 코드를 직접 제어할 수 있는 클래스
//      HTTP 상태 코드와 데이터를 클라이언트로 전송
                return ResponseEntity.ok().body(responseUserDTO);
            } else {
//      사용자 정보가 없을 경우 HTTP 상태 코드와 데이터를 클라이언트로 전송
                ResponseDTO responseDTO = ResponseDTO.builder()
                        .error("fail")
                        .build();
                return ResponseEntity
                        .badRequest()
                        .body(responseDTO);
            }


//    사용자 정보가 있을 경우

    }

    @PostMapping("/update")
    public ResponseEntity<?> authenticateUpdate(@RequestBody PersonRequest personRequest) throws Exception {
//    서비스를 사용하여 사용자 인증 정보 가져오기
        System.out.println(personRequest);
        PersonEntity person = simService.getUserInfo(personRequest.getPersonId());

//    사용자 정보가 있을 경우
        if (person != null) {
            // 웹 토큰 생성기로 토큰 생성
            final String token = tokenProvider.create(person);
//      UserDTO 타입으로 사용자 ID/PW, 토큰 정보 저장
            final PersonRequest responseUserDTO = PersonRequest.builder()
                    .personId(person.getPersonId())
                    .personIdx(person.getPersonIdx())
                    .personPassword(person.getPersonPassword())
                    .personNickName(person.getPersonNickName())
                    .personLanguage(person.getPersonLanguage())
                    .personJoinDt(person.getPersonJoinDt())
                    .personLevel(person.getPersonLevel())
                    .personTotalScore(person.getPersonTotalScore())
                    .personImgPath(person.getPersonImgPath())
                    .personBannedMsg(person.getPersonBannedMsg())
                    .personPasswordUpdateDt(person.getPersonPasswordUpdateDt())
                    .token(token)
                    .build();

//      ResponseEntity : HTTP 상태 코드를 직접 제어할 수 있는 클래스
//      HTTP 상태 코드와 데이터를 클라이언트로 전송
            return ResponseEntity.ok().body(responseUserDTO);
        } else {
//      사용자 정보가 없을 경우 HTTP 상태 코드와 데이터를 클라이언트로 전송
            ResponseDTO responseDTO = ResponseDTO.builder()
                    .error("업데이트 실패")
                    .build();
            return ResponseEntity
                    .badRequest()
                    .body(responseDTO);
        }
    }

//    @RequestMapping("/")
//    public String main() throws Exception {
//
//        return "redirect:/pi/main";
//    }
}