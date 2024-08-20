package com.hospitalspring.app.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDto {

    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-mm-yyyy")
    private Date date;

    private String time;

    private String status;

    private String comments;

    private DoctorDto doctor;

    public DoctorDto getDoctor() {
        return doctor;
    }
}
