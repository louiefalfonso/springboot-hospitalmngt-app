package com.hospitalspring.app.service.impl;

import com.hospitalspring.app.dtos.AppointmentDto;
import com.hospitalspring.app.entity.Appointment;
import com.hospitalspring.app.repository.AppointmentRepository;
import com.hospitalspring.app.service.AppointmentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private AppointmentRepository appointmentRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Appointment
    @Override
    public AppointmentDto createAppointment(AppointmentDto appointmentDto) {
        Appointment appointment = modelMapper.map(appointmentDto, Appointment.class);
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return modelMapper.map(savedAppointment, AppointmentDto.class);
    }

    // REST API - Get All Appointments
    @Override
    public List<AppointmentDto> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointments.stream().map((appointment)-> modelMapper.map(appointment, AppointmentDto.class))
                .collect(Collectors.toList());
    }

    // REST API - Get Appointment By Id
    @Override
    public AppointmentDto getAppointmentById(Long appointmentId) {
        Appointment appointment = appointmentRepository.findAllById(appointmentId)
                .orElseThrow(()-> new RuntimeException("Appointment doesn't exist with a given Id:" + appointmentId));
        return modelMapper.map(appointment, AppointmentDto.class);
    }

    @Override
    public void deleteAppointment(Long appointmentId) {

    }

}
