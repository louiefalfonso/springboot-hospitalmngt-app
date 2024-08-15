package com.hospitalspring.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "patients")
public class Patient {

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

    @Column(name = "sex")
    private String sex;

    @Column(name = "age")
    private String age;

    @Column(name = "address")
    private String address;

}
