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

    @Column(name = "number")
    private String number;

    @Column(name = "specialization")
    private String specialization;

    @Column(name= "department")
    private String department;

    @Column(name = "schedule")
    private String schedule;

}
