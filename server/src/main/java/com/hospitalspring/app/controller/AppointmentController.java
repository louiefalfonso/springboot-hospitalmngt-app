package com.hospitalspring.app.controller;

import com.hospitalspring.app.dtos.AppointmentDto;
import com.hospitalspring.app.entity.Doctor;
import com.hospitalspring.app.repository.AppointmentRepository;
import com.hospitalspring.app.repository.DoctorRepository;
import com.hospitalspring.app.service.AppointmentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@AllArgsConstructor
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private AppointmentRepository appointmentRepository;
    private AppointmentService appointmentService;
    private DoctorRepository doctorRepository;

    //POST New Appointment REST API
    @PostMapping
    public ResponseEntity<AppointmentDto> createAppointment(@RequestBody AppointmentDto appointmentDto){
        AppointmentDto savedAppointment = appointmentService.createAppointment(appointmentDto);
        doctorRepository.findAllById(savedAppointment.getDoctor().getId())
                .orElseThrow(() -> new RuntimeException("Doctor does not exist with Id:" + savedAppointment.getDoctor().getId()));
        return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
    }
    //GET All Appointment REST API

    /*
    //POST New Appointment REST API
        @PostMapping
        public ResponseEntity<AppointmentDto> createAppointment(@RequestBody AppointmentDto appointmentDto){
            AppointmentDto savedAppointment = appointmentService.createAppointment(appointmentDto);
            Doctor doctor = doctorRepository.findAllById(savedAppointment.getDoctor().getId())
                    .orElseThrow(()-> new RuntimeException("Doctor does not exist with Id:" + savedAppointment.getDoctor().getId()));
            savedAppointment.setDoctor(modelMapper.map(doctor, DoctorDto.class));
            return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
        }


    //GET All Doctors REST API
    @GetMapping
    public ResponseEntity<List<DoctorDto>> getAllDoctors(){
        List<DoctorDto> doctor = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctor);
    }
     */

}
