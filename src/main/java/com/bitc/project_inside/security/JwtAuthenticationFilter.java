//
//package com.bitc.project_inside.security;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AbstractAuthenticationToken;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.authority.AuthorityUtils;
//import org.springframework.security.core.context.SecurityContext;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.stereotype.Component;
//import org.springframework.util.StringUtils;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
////OncePerRequestFilter : 클라이언트의 요청 한번에 단 한번만 실행되는 필터
//@Slf4j
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//  @Autowired
//  private TokenProvider tokenProvider;
//
//  @Override
//  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//    try {
//      // 요청에서 토큰 가져오기.
//      String token = parseBearerToken(request);
//      log.info("Filter is running...");
//      // 토큰 검사하기. JWT이므로 인가 서버에 요청 하지 않고도 검증 가능.
//      if (token != null && !token.equalsIgnoreCase("null")) { // jwt token이 있을 경우
//        // userId 가져오기. 위조 된 경우 예외 처리 된다.
//        String userId = tokenProvider.validateAndGetUserId(token);
//        log.info("Authenticated user ID : " + userId );
//
////        UsernamePasswordAuthenticationToken : 추후 인증이 끝나고 SecurityContextHolder.getContext()에 등록될 Authentication 객체
//        // 인증 완료; SecurityContextHolder에 등록해야 인증된 사용자라고 생각한다.
//        AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//            userId, // 인증된 사용자의 정보. 문자열이 아니어도 아무거나 넣을 수 있다. 보통 UserDetails라는 오브젝트를 넣는데, 우리는 안 만들었음.
//            null, //
//            AuthorityUtils.NO_AUTHORITIES
//        );
//        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
////        SecurityContextHolder : 스프링 프레임워크 전체에서 인증 정보를 가지고 있는 컨텍스트
//        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
//        securityContext.setAuthentication(authentication);
//        SecurityContextHolder.setContext(securityContext);
//      }
//    } catch (Exception ex) {
//      logger.error("Could not set user authentication in security context", ex);
//    }
//
//    filterChain.doFilter(request, response);
//  }
//
////  사용자 요청 header에서 token 문자열을 가져옴
//  private String parseBearerToken(HttpServletRequest request) {
//    // Http 요청의 헤더를 파싱해 Bearer 토큰을 리턴한다.
//    String bearerToken = request.getHeader("Authorization");
//
//    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
//      return bearerToken.substring(7);
//    }
//    return null;
//  }
//}
//
