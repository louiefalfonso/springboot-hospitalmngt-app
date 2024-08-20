package com.hospitalspring.app.mapper;

import com.hospitalspring.app.dtos.AppointmentDto;
import com.hospitalspring.app.dtos.DoctorDto;
import com.hospitalspring.app.entity.Appointment;

public class AppointmentMapper {

    public static AppointmentDto mapToAppointmentDto(Appointment appointment){
        DoctorDto doctorDto = new DoctorDto(
                appointment.getDoctor().getId(),
                appointment.getDoctor().getFirstName(),
                appointment.getDoctor().getLastName(),
                appointment.getDoctor().getSpecialization(),
                appointment.getDoctor().getDepartment(),
                appointment.getDoctor().getEmail(),
                appointment.getDoctor().getNumber(),
                appointment.getDoctor().getSchedule()
        );

        return new AppointmentDto(
                appointment.getId(),
                appointment.getDate(),
                appointment.getTime(),
                appointment.getStatus(),
                appointment.getComments(),
                doctorDto
        );
    }

    public static Appointment mapToAppointment(AppointmentDto appointmentDto){
        Appointment appointment = new Appointment();
        appointment.setId(appointmentDto.getId());
        appointment.setDate(appointmentDto.getDate());
        appointment.setTime(appointmentDto.getTime());
        appointment.setStatus(appointmentDto.getStatus());
        appointment.setComments(appointmentDto.getComments());
        return appointment;
    }
}