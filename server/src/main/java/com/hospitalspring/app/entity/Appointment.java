package com.hospitalspring.app.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hospitalspring.app.dtos.DoctorDto;
import jakarta.persistence.*;
import lombok.*;

import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date")
    private Date date;

    @Column(name = "time")
    private String time;

    @Column(name = "status")
    private String status;

    @Column(name = "comments")
    private String comments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = true)
    private Doctor doctor;
}


