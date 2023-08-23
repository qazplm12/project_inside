package com.bitc.project_inside.configuration;

import com.bitc.project_inside.security.JwtAuthenticationFilter;
import jakarta.servlet.DispatcherType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
@Slf4j
@Configuration
@RequiredArgsConstructor
public class WebJWTConfig {
    final private JwtAuthenticationFilter jwtAuthenticationFilter;

    
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
