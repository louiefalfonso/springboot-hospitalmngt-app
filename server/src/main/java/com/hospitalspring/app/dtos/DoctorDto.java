package com.hospitalspring.app.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String number;
    private String department;
    private String specialization;
    private String schedule;

    public DoctorDto(Long id, String firstName, String lastName, String specialization, String department) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
        this.department = department;
    }


}
