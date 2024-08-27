package com.hospitalspring.app;


import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@SpringBootApplication
@ComponentScan(basePackages = {"HospitalappApplication"})
public class HospitalappApplication {

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}

	public static void main(String[] args) {
		SpringApplication.run(HospitalappApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
						.allowedOrigins("https://springboot3-stlukesapp.netlify.app",
								"https://springboot-hospitalmngt-app.onrender.com")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD")
						.allowedHeaders("*")
						.exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers") // Add this line
						.maxAge(3600);

				registry.addMapping("/auth/**")
						.allowedOrigins("https://springboot3-stlukesapp.netlify.app",
								"https://springboot-hospitalmngt-app.onrender.com")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD")
						.allowedHeaders("*")
						.exposedHeaders("Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Headers") // Add this line
						.maxAge(3600);
			}
		};
	}



}
