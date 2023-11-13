package com.diary.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class StaticResourceConfiguration implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //프로필
        registry.addResourceHandler("/profile/**")
                .addResourceLocations("classpath:/static/profile/");
        //AI이미지
        registry.addResourceHandler("/background/**")
                .addResourceLocations("classpath:/static/background/**");
    }
}
