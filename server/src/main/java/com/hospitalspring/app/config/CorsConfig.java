package com.hospitalspring.app.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://springboot3-stlukesapp.netlify.app")
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}
