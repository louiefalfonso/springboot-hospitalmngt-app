package com.hospitalspring.app.controller;

import com.hospitalspring.app.dtos.AppointmentDto;
import com.hospitalspring.app.entity.Appointment;
import com.hospitalspring.app.repository.AppointmentRepository;
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

    @Autowired
    private AppointmentRepository appointmentRepository;
    private AppointmentService appointmentService;

    //POST New Appointment REST API
    @PostMapping
    public ResponseEntity<AppointmentDto> createAppointment(@RequestBody AppointmentDto appointmentDto){
        AppointmentDto savedAppointment = appointmentService.createAppointment(appointmentDto);
        return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
    }
    //GET All Appointment REST API
    @GetMapping
    public  ResponseEntity<List<AppointmentDto>> getAllAppointments(){
        List<AppointmentDto> appointment = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointment);
    }

    //GET Appointment By Id REST API
    @GetMapping("{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable("id") long id){
        Appointment appointment = appointmentRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Appointment does not exist with Id:" + id));
        return ResponseEntity.ok(appointment);
    }


}
