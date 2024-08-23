package com.hospitalspring.app.service.impl;

import com.hospitalspring.app.dtos.PatientDto;
import com.hospitalspring.app.entity.Patient;
import com.hospitalspring.app.repository.PatientRepository;
import com.hospitalspring.app.service.PatientService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PatientServiceImpl implements PatientService {

    private PatientRepository patientRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Patient
    @Override
    public PatientDto createPatient(PatientDto patientDto) {
        Patient patient = modelMapper.map(patientDto, Patient.class);
        Patient savedPatient = patientRepository.save(patient);
        return modelMapper.map(savedPatient, PatientDto.class);
    }

    // REST API - Get Patient By Id
    @Override
    public PatientDto getPatientById(Long patientId) {
        Patient patient = patientRepository.findAllById(patientId)
                .orElseThrow(()-> new RuntimeException("Doctor doesn't exist with a given Id:" + patientId));
        return modelMapper.map(patient,PatientDto.class);
    }

    // REST API - Get All Patients
    @Override
    public List<PatientDto> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        return patients.stream().map((patient)->modelMapper.map(patient, PatientDto.class))
                .collect(Collectors.toList());
    }

    // REST API - Update Patient
    @Override
    public PatientDto updatePatient(Long patientId, PatientDto updatePatient) {
        Patient patient = patientRepository.findAllById(patientId).orElseThrow(
                ()-> new RuntimeException("Patient doesn't exist with a given Id:" + patientId));

        patient.setFullName(updatePatient.getFullName());
        patient.setAge(updatePatient.getAge());
        patient.setEmail(updatePatient.getEmail());
        patient.setSex(updatePatient.getSex());
        patient.setNumber(updatePatient.getNumber());
        patient.setAddress(updatePatient.getAddress());
        patient.setDiagnosis(updatePatient.getDiagnosis());

        Patient updatePatientObj = patientRepository.save(patient);
        return modelMapper.map(updatePatientObj, PatientDto.class);
    }

    // REST API - Delete Patient
    @Override
    public void deletePatient(Long patientId) {
        Patient patient = patientRepository.findAllById(patientId).orElseThrow(
                ()-> new RuntimeException("Patient doesn't exist with given id:" + patientId));
        patientRepository.deleteById(patientId);
    }

}
