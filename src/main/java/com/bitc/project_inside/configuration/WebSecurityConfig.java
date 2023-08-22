package com.bitc.project_inside.configuration;

import com.bitc.project_inside.security.JwtAuthenticationFilter;
import jakarta.servlet.DispatcherType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
//@EnableMethodSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
@Slf4j
@Configuration
@RequiredArgsConstructor
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
public class WebSecurityConfig {

    final private JwtAuthenticationFilter jwtAuthenticationFilter;

//  @Override
//  protected void configure(HttpSecurity http) throws Exception {
//    // http 시큐리티 빌더
//    http.cors() // WebMvcConfig에서 이미 설정했으므로 기본 cors 설정.
//        .and()
//        .csrf()// csrf는 현재 사용하지 않으므로 disable
//        .disable()
//        .httpBasic()// token을 사용하므로 basic 인증 disable
//        .disable()
//        .sessionManagement()  // session 기반이 아님을 선언
//        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//        .and()
//        .authorizeRequests() // /와 /auth/** 경로는 인증 안해도 됨.
//        .antMatchers("/", "/auth/**", "/todo/list").permitAll()
//        .anyRequest() // /와 /auth/**이외의 모든 경로는 인증 해야됨.
//        .authenticated();
//
//    // filter 등록.
//    // 매 요청마다
//    // CorsFilter 실행한 후에
//    // jwtAuthenticationFilter 실행한다.
//    http.addFilterAfter(
//        jwtAuthenticationFilter,
//        CorsFilter.class
//    );
//  }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests
                        .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/**")).permitAll()    // /와 /auth/** 경로는 인증 안해도 됨.
                        .requestMatchers(new AntPathRequestMatcher("/emailConfirm")).permitAll()    // /와 /auth/** 경로는 인증 안해도 됨.
                        .requestMatchers(new AntPathRequestMatcher("/checkNick")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/insertPerson")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/login")).permitAll()
                        .anyRequest().authenticated());

        http.addFilterAfter(jwtAuthenticationFilter, CsrfFilter.class);

        return http.build();
    }
}

