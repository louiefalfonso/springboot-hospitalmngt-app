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
    private String contactnumber;
    private String department;
    private String specialization;
    private String schedule;

    public Object getFirstName() {
        return firstName;
    }

    public Object getLastName() {
        return lastName;
    }

    public Object getEmail() {
        return  email;
    }

    public Object getContactNumber() {
        return  contactnumber;
    }

    public Object getDepartment() {
        return  department;
    }
    public Object getSpecialization() {
        return  specialization;
    }
    public Object getSchedule() {
        return schedule;
    }


    public Object getId() {
        return id;
    }
}
