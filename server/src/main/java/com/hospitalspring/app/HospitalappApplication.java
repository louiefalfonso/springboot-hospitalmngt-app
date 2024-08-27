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
}
