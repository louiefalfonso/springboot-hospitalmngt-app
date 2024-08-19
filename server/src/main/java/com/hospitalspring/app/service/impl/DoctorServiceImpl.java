package com.hospitalspring.app.service.impl;

import com.hospitalspring.app.dtos.DoctorDto;
import com.hospitalspring.app.entity.Doctor;
import com.hospitalspring.app.repository.DoctorRepository;
import com.hospitalspring.app.service.DoctorService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private DoctorRepository doctorRepository;
    private ModelMapper modelMapper;

    // REST API - Create Doctor
    @Override
    public DoctorDto createDoctor(DoctorDto doctorDto){
        Doctor doctor = modelMapper.map(doctorDto, Doctor.class);
        Doctor savedDoctor = doctorRepository.save(doctor);
        return modelMapper.map(savedDoctor, DoctorDto.class);

    }

    // REST API - Get Doctor By Id
    @Override
    public DoctorDto getDoctorById(Long doctorId) {
        Doctor doctor = doctorRepository.findAllById(doctorId)
                .orElseThrow(()-> new RuntimeException("Doctor doesn't exist with a given Id:" + doctorId));
        return modelMapper.map(doctor, DoctorDto.class);
    }




    // REST API - Get All Doctors
    @Override
    public List<DoctorDto> getAllDoctors(){
        List<Doctor> doctors = doctorRepository.findAll();
        return doctors.stream().map((doctor)-> modelMapper.map(doctor, DoctorDto.class))
                .collect(Collectors.toList());
    }

    // REST API - Update Doctor
    @Override
    public DoctorDto updateDoctor(Long doctorId, DoctorDto updateDoctor){
        Doctor doctor = doctorRepository.findAllById(doctorId).orElseThrow(
                ()-> new RuntimeException("Doctor doesn't exist with a given Id:" + doctorId)
        );
        doctor.setFirstName(updateDoctor.getFirstName());
        doctor.setLastName(updateDoctor.getLastName());
        doctor.setEmail(updateDoctor.getEmail());
        doctor.setNumber(updateDoctor.getNumber());
        doctor.setDepartment(updateDoctor.getDepartment());
        doctor.setSchedule(updateDoctor.getSchedule());

        Doctor updateDoctorObj = doctorRepository.save(doctor);
        return  modelMapper.map(updateDoctorObj, DoctorDto.class);
    }

    // REST API - Delete Doctor
    @Override
    public void deleteDoctor(Long doctorId) {
        Doctor doctor = doctorRepository.findAllById(doctorId).orElseThrow(
                ()-> new RuntimeException("Doctor doesn't exist with given id:" + doctorId)
        );
        doctorRepository.deleteById(doctorId);
    }
}

