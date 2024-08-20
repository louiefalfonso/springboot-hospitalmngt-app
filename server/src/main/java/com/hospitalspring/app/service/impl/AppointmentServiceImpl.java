package com.hospitalspring.app.service.impl;

import com.hospitalspring.app.dtos.AppointmentDto;
import com.hospitalspring.app.entity.Appointment;
import com.hospitalspring.app.entity.Doctor;
import com.hospitalspring.app.repository.AppointmentRepository;
import com.hospitalspring.app.repository.DoctorRepository;
import com.hospitalspring.app.service.AppointmentService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final ModelMapper modelMapper;

    @Override
    public AppointmentDto createAppointment(AppointmentDto appointmentDto) {
        // Convert AppointmentDto to Appointment entity
        Appointment appointment = modelMapper.map(appointmentDto, Appointment.class);

        // Save the appointment to the database
        Appointment savedAppointment = appointmentRepository.save(appointment);

        // Convert the saved appointment back to AppointmentDto
        return modelMapper.map(savedAppointment, AppointmentDto.class);
    }


}
