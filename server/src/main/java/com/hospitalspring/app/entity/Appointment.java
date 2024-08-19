package com.hospitalspring.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "appointments")

public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @DateTimeFormat(pattern = "dd-mm-yyyy")
    @Column(name = "date")
    private Date date;

    private String time;
    private String status;
    private String comments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctorId;

    public Appointment(Long id, Date date, String time, String status, String comments) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.status = status;
        this.comments = comments;
    }
}


