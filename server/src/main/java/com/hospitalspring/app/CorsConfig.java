package com.hospitalspring.app;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("https://springboot3-stlukesapp.netlify.app")
                        .allowedMethods("GET");

                registry.addMapping("/auth/**")
                        .allowedOrigins("https://springboot3-stlukesapp.netlify.app")
                        .allowedMethods("GET");
            }
        };
    }
}