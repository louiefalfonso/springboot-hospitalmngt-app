package com.hospitalspring.app.repository;

import com.hospitalspring.app.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    Optional<Appointment> findAllById (Long doctorId);
}
