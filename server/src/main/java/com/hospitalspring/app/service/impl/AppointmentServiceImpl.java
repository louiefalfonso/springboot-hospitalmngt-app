package com.hospitalspring.app.service.impl;

import com.hospitalspring.app.dtos.AppointmentDto;
import com.hospitalspring.app.entity.Appointment;
import com.hospitalspring.app.repository.AppointmentRepository;
import com.hospitalspring.app.service.AppointmentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import com.hospitalspring.app.entity.Doctor;

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

    // REST API - Delete Appointment
    @Override
    public void deleteAppointment(Long appointmentId) {
        appointmentRepository.findAllById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment doesn't exist with given id:" + appointmentId));
        appointmentRepository.deleteById(appointmentId);
    }

    // REST API - Update Appointment
    @Override
    public AppointmentDto updateAppointment(Long appointmentId, AppointmentDto updateAppointment) {
        Appointment appointment = appointmentRepository.findAllById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment doesn't exist with a given Id:" + appointmentId));

        appointment.setDate(updateAppointment.getDate());
        appointment.setTime(updateAppointment.getTime());
        appointment.setStatus(updateAppointment.getStatus());
        appointment.setComments(updateAppointment.getComments());
        appointment.setDoctor(modelMapper.map(updateAppointment.getDoctor(),Doctor.class));

        Appointment updatedAppointmentObj = appointmentRepository.save(appointment);
        return modelMapper.map(updatedAppointmentObj, AppointmentDto.class);
    }

}
