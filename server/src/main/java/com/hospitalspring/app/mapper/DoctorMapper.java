package com.hospitalspring.app.mapper;

import com.hospitalspring.app.dtos.DoctorDto;
import com.hospitalspring.app.entity.Doctor;

public class DoctorMapper {

    // Convert Student JPA Entity to DTO
    public static DoctorDto mapToDoctorDto(Doctor doctor){
        return new DoctorDto(
                doctor.getId(),
                doctor.getFirstName(),
                doctor.getLastName(),
                doctor.getEmail(),
                doctor.getContactnumber(),
                doctor.getDepartment(),
                doctor.getSpecialization(),
                doctor.getSchedule()
        );
    }

    // Convert Student DTO to JPA Entity
    public static Doctor mapToDoctor( DoctorDto doctorDto){
        return  new Doctor(
                doctorDto.getId(),
                doctorDto.getFirstName(),
                doctorDto.getLastName(),
                doctorDto.getEmail(),
                doctorDto.getContactNumber(),
                doctorDto.getDepartment(),
                doctorDto.getSpecialization(),
                doctorDto.getSchedule()
        );
    }


}