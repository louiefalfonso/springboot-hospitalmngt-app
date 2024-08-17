package com.hospitalspring.app.controller;

import com.hospitalspring.app.dtos.DoctorDto;
import com.hospitalspring.app.entity.Doctor;
import com.hospitalspring.app.repository.DoctorRepository;
import com.hospitalspring.app.service.DoctorService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private DoctorService doctorService;

    @Autowired
    private DoctorRepository doctorRepository;

    //POST New Doctor
    @PostMapping
    public ResponseEntity<DoctorDto> createDoctor(@RequestBody DoctorDto doctorDto){
        DoctorDto savedDoctor = doctorService.createDoctor(doctorDto);
        return new ResponseEntity<>(savedDoctor, HttpStatus.CREATED);
    }

    //GET Doctor By ID
    @GetMapping("{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable long id){
        Doctor doctor = doctorRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Doctor does not exist with Id:" + id));
        return  ResponseEntity.ok(doctor);
    }

    //GET All Doctors
    @GetMapping
    public ResponseEntity<List<DoctorDto>> getAllDoctors(){
        List<DoctorDto> doctor = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctor);
    }

}



