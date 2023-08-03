package com.bitc.project_inside.configuration;

import jakarta.servlet.MultipartConfigElement;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

@Configuration
public class WebMvcConfiguration {


    @Bean
    public MultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        // 업로드 파일의 크기 설정
        factory.setMaxRequestSize(DataSize.ofBytes(10 * 1024 * 1024));
        factory.setMaxFileSize(DataSize.ofBytes(10 * 1024 * 1024));

        return factory.createMultipartConfig();
    }
}
