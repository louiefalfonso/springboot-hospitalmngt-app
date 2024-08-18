package com.hospitalspring.app.service;

import com.hospitalspring.app.dtos.DoctorDto;

import java.util.List;

public interface DoctorService {

    DoctorDto createDoctor (DoctorDto doctorDto);

    DoctorDto getDoctorById(Long doctorId);

    List<DoctorDto> getAllDoctors();

    DoctorDto updateDoctor(Long doctorId, DoctorDto updateDoctor);

    void deleteDoctor(Long doctorId);
}



