package com.hospitalspring.app.mapper;

import com.hospitalspring.app.dtos.AppointmentDto;
import com.hospitalspring.app.entity.Appointment;

public class AppointmentMapper {

    // Convert Appointment JPA Entity to DTO
    public  static AppointmentDto mapToAppointmentDto(Appointment appointment){
        return new AppointmentDto(
                appointment.getId(),
                appointment.getDate(),
                appointment.getTime(),
                appointment.getStatus(),
                appointment.getComments()
        );
    }

    // Convert Appointment DTO to JPA Entity
    public static Appointment mapToAppointment(AppointmentDto appointmentDto){
        return new Appointment(
                appointmentDto.getId(),
                appointmentDto.getDate(),
                appointmentDto.getTime(),
                appointmentDto.getStatus(),
                appointmentDto.getComments()
        );
    }

}

