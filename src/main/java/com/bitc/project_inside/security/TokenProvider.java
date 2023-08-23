package com.bitc.project_inside.security;

import com.bitc.project_inside.data.entity.PersonEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
public class TokenProvider {
  private static final String SECRET_KEY = "FlRpX30pMqDbiAkmlfArbrmVkDD4RqISskGZmBFax5oGVxzXXWUzTR5JyskiHMIV9M1Oicegkpi46AdvrcX1E6CmTUBc6IFbTPiD";
//private static final String SECRET_KEY = "test1@bitc.ac.kr";

//  토큰 생성하기
  public String create(PersonEntity personEntity) {
//    Instant : 자바의 날짜/시간 API, 타임라인의 특정 시점을 나타냄
//      now(): 현재 시간을 시점으로 함
//      plus() / minus() : Instant 클래스 객체에 시간을 더하거나 빼서 다른 시간으로 변경
//      isAfter() / isBefore() : 두 시점의 선후 관계를 확인

//    ChronoUnit : 날짜 기간 단위의 표준 열거형 집합

    // 토큰 사용 기간 설정, 현재 시간으로부터 1일
    Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));

  /*
  { // header
    "alg":"HS512"
  }.
  { // payload
    "sub":"40288093784915d201784916a40c0001",
    "iss": "demo app",
    "iat":1595733657,
    "exp":1596597657
  }.
  // SECRET_KEY를 이용해 서명한 부분
  Nn4d1MOVLZg79sfFACTIpCPKqWmpZMZQsbNrXdJJNWkRv50_l7bPLQPwhMobT4vBOG6Q3JYjhDrKFlBSaUxZOg
   */
    // JWT Token 생성
    return Jwts.builder()
        // header에 들어갈 내용 및 서명을 하기 위한 SECRET_KEY
        .signWith(SignatureAlgorithm.HS512, SECRET_KEY) // signature // 현재 토큰의 암호화 방식 / 비밀키
        // payload에 들어갈 내용
        .setSubject(personEntity.getPersonId()) // sub // 현재 토큰의 주인, 사용자 ID와 같은 유일한 식별자
        .setIssuer(personEntity.getPersonNickName() == "admin" ? "admin" : "user") // iss // 현재 토큰을 발행한 주체 이지만 role 대신 사용하기 위해 user와 admin 구분
        .setIssuedAt(new Date()) // iat // 현재 토큰이 발행된 시간
        .setExpiration(expiryDate) // exp // 현재 토큰을 사용할 수 있는 제한 시간
        .compact();
  }

//  사용자 정보 및 인증 여부 가져오기
  public String validateAndGetUserId(String token) {
    // parseClaimsJws메서드가 Base 64로 디코딩 및 파싱.
    // 즉, 헤더와 페이로드를 setSigningKey로 넘어온 시크릿을 이용 해 서명 후, token의 서명 과 비교.
    // 위조되지 않았다면 페이로드(Claims) 리턴, 위조라면 예외를 날림
    // 그 중 우리는 userId가 필요하므로 getBody를 부른다.
    Claims claims = Jwts.parser()
        .setSigningKey(SECRET_KEY)
        .parseClaimsJws(token)
        .getBody();

    return claims.getSubject();
  }


}

