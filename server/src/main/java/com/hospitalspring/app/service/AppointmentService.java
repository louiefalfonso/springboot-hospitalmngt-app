package com.hospitalspring.app.service;

import com.hospitalspring.app.dtos.AppointmentDto;
import com.hospitalspring.app.dtos.DoctorDto;

import java.util.List;

public interface AppointmentService {

    AppointmentDto createAppointment (AppointmentDto appointmentDto);

    List<AppointmentDto> getAllAppointments();

    AppointmentDto getAppointmentById (Long appointmentId);

    void  deleteAppointment (Long appointmentId);

    AppointmentDto updateAppointment (Long appointmentId, AppointmentDto updateAppointment);



}
