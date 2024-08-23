package com.hospitalspring.app.service;

import com.hospitalspring.app.dtos.PatientDto;

import java.util.List;

public interface PatientService {

    PatientDto createPatient (PatientDto patientDto);

    PatientDto getPatientById (Long patientId);

    List<PatientDto> getAllPatients();

    PatientDto updatePatient(Long patientId, PatientDto updatePatient);

    void  deletePatient(Long patientId);
}
