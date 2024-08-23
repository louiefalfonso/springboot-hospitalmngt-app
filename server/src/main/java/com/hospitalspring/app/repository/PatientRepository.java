package com.hospitalspring.app.repository;

import com.hospitalspring.app.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient,Long> {
    Optional<Patient> findAllById (Long PatientId);
}
