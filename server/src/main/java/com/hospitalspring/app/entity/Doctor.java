package com.hospitalspring.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name="doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "contactnumber")
    private String contactnumber;

    @Column(name = "specialization")
    private String specialization;

    @Column(name= "department")
    private String department;

    @Column(name = "schedule")
    private String schedule;

    public Doctor(Object id, Object firstName, Object lastName, Object email, Object contactNumber, Object department, Object specialization, Object schedule) {
    }

    public void setFirstName(Object firstName) {
    }

    public void setLastName(Object lastName) {
    }

    public void setEmail(Object email) {
    }

    public void setDepartment(Object department) {
    }

    public void setContactNumber(Object contactNumber) {
    }

    public void setSchedule(Object schedule) {
    }


}
