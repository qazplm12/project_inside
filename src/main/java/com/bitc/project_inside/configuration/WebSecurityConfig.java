package com.bitc.project_inside.configuration;

import com.bitc.project_inside.service.PersonDetailService;
import jakarta.servlet.DispatcherType;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsConfigurationSource;

import java.util.Arrays;

@RequiredArgsConstructor
@Configuration
@Log4j2
public class WebSecurityConfig {

    private final PersonDetailService personDetailService;

    //  스프링 시큐리티에서는 무조건 암호화된 비밀번호를 사용해야 함
//  비밀번호 인코더 사용 설정
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //  스프링 시큐리티 설정 무시 항목 추가
    @Bean
    public WebSecurityCustomizer configure() {
        return (web) -> web.ignoring()
                .requestMatchers("/static/**");
    }

    //  스프링 시큐리티 필터 설정
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//    authorizeRequests() : 인증 목록 설정
//    dispatcherTypeMatchers(DispatcherType) : 서버 내부에서 포워드 시 권한 설정
//    requestMatchers(url) : 사용자 요청 주소 매핑
//    permitAll() : 모든 권한 허용
//    anyRequest() : 모든 요청, 마지막에 있어야 함
//    authenticated() : 권한 인증 필요
//    and() : 추가 옵션 설정 시 사용
//    formLogin() : 로그인 폼 화면 사용
//    loginPage(url) : 사용자 지정 로그인 화면 url 설정
//    defaultSuccessUrl(url) : 로그인 성공 시 출력할 화면 url 설정
//    usernameParameter(name) : 로그인 시 서버로 전송하는 아이디의 input 태그 name 속성값
//    passwordParameter(name) : 로그인 시 서버로 전송하는 비밀번호의 input 태그 name 속성값
//    logout() : 로그아웃 사용 여부
//    logoutSuccessUrl(url) : 로그아웃 성공 시 출력할 화면 url 설정
//    invalidateHttpSession() : 모든 세션 정보 삭제
//    csrf().disable() : CSRF 공격(Cross Site Request Forgery)은 웹 어플리케이션 취약점 중 하나로 인터넷 사용자(희생자)가 자신의 의지와는 무관하게 공격자가 의도한 행위(수정, 삭제, 등록 등)를 특정 웹사이트에 요청하게 만드는 공격
//    참고 https://itstory.tk/entry/CSRF-%EA%B3%B5%EA%B2%A9%EC%9D%B4%EB%9E%80-%EA%B7%B8%EB%A6%AC%EA%B3%A0-CSRF-%EB%B0%A9%EC%96%B4-%EB%B0%A9%EB%B2%95
//    cors()disable() :
//    return http
//        .authorizeRequests()
//          .requestMatchers("/login", "/signup", "/user").permitAll()
//          .anyRequest().authenticated()
//        .and().formLogin()
//          .loginPage("/login")
////          .defaultSuccessUrl("/articles")
//        .and().logout()
//          .logoutSuccessUrl("/login")
//        .invalidateHttpSession(true)
//        .and().csrf().disable()
//        .build();

        return http
                .csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.disable())
                .cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.disable())
                .authorizeHttpRequests(authorizeHttpRequestsConfigurer -> authorizeHttpRequestsConfigurer
                        .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                        .requestMatchers("/server/**", "/simServer/**", "/emailConfirm", "/checkNick", "/signup", "/login", "/userAuth/**", "http://localhost:3000/pi/**").permitAll()  // 비 로그인시 이용 가능
                        .anyRequest().authenticated())
                .formLogin(formLoginConfigurer -> formLoginConfigurer
                        .loginPage("/login")    // 로그인 페이지 지정, (얘가 too many redirect 범인. 이유는 백엔드인 8080주소로 계속 접속 시도해서 그럼, 로그인 성공 후 이동할 페이지 이기도 함, POST 통신마다 가로채는듯)
//                        .loginProcessingUrl("/loginProcess")
                        .usernameParameter("personId")
                        .passwordParameter("personPassword")
                        .defaultSuccessUrl("http://localhost:3000/pi/main") // 이거도 로그인 성공 후 이동할 페이지. .loginPage랑 서로 다른 주소 썼을때 .loginPage의 주소로 따라감
                        .permitAll())
                //        .logout(Customizer.withDefaults())
                .logout(logoutConfigurer -> logoutConfigurer
                        .logoutSuccessUrl("http://localhost:3000/pi/main")  // 로그 아웃 후 이동할 페이지
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .clearAuthentication(true))
                .build();
    }

    //  사용 권한 인증 관리자 설정
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder, PersonDetailService personDetailService) throws Exception {

//    return http.getSharedObject(AuthenticationManagerBuilder.class)
////        스프링시큐리티에서 제공하는 UserDetailsService 인터페이스를 구현한 UserDetailService 클래스의 객체를 매개변수로 사용함
////        데이터 베이스에 있는 사용자 정보를 가져와서 사용 권한 인증 관리자에 넘겨줌
//        .userDetailsService(userDetailService)
//        .passwordEncoder(bCryptPasswordEncoder)
//        .and()
//        .build();

        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(personDetailService).passwordEncoder(bCryptPasswordEncoder);
        return authenticationManagerBuilder.build();
    }
}










