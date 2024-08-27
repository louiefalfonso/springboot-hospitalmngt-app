package com.hospitalspring.app.controller;

import com.hospitalspring.app.dtos.AppointmentDto;
import com.hospitalspring.app.entity.Appointment;
import com.hospitalspring.app.repository.AppointmentRepository;
import com.hospitalspring.app.service.AppointmentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.OPTIONS, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.POST}, allowCredentials = "true")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;
    private AppointmentService appointmentService;
    private ModelMapper modelMapper;


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
    public ResponseEntity<AppointmentDto> getAppointmentById(@PathVariable("id") long id){
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment does not exist with Id:" + id));
        AppointmentDto appointmentDto = modelMapper.map(appointment, AppointmentDto.class);
        return ResponseEntity.ok(appointmentDto);
    }


    //DELETE Appointment REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable("id")Long appointmentId){
        appointmentService.deleteAppointment(appointmentId);
        return ResponseEntity.ok("Appointment Deleted Successfully");
    }

    //UPDATE Doctor REST API
    @PutMapping("{id}")
    public ResponseEntity<AppointmentDto> updateAppoinment(@PathVariable ("id") long id,
                                                           @RequestBody Appointment appointmentDetails){
        Appointment updateAppointment = appointmentRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Appointment does not exist with id:" + id));

        updateAppointment.setDate(appointmentDetails.getDate());
        updateAppointment.setTime(appointmentDetails.getTime());
        updateAppointment.setStatus(appointmentDetails.getStatus());
        updateAppointment.setComments(appointmentDetails.getComments());
        updateAppointment.setDoctor(appointmentDetails.getDoctor());

        appointmentRepository.save(updateAppointment);
        AppointmentDto updatedAppointmentDto = modelMapper.map(updateAppointment, AppointmentDto.class);
        return ResponseEntity.ok(updatedAppointmentDto);
    }


}
