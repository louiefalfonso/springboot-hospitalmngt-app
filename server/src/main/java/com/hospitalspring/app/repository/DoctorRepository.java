package com.hospitalspring.app.repository;

import com.hospitalspring.app.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findAllById(Long doctorId);

}
