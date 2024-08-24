package com.hospitalspring.app;

import com.hospitalspring.app.entity.Patient;
import com.hospitalspring.app.repository.PatientRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
public class PatientRepositoryTest {

    @Autowired
    private PatientRepository patientRepository;

    //JUnit Test for Save Patient
    @Test
    public void getPatientTest() {

        // Create a patient with ID 1L if it doesn't exist
        Patient patient = patientRepository.findById(1L).orElseGet(() -> {
            Patient newPatient = new Patient();
            newPatient.setId(1L);
            return patientRepository.save(newPatient);
        });

        // Verify that the retrieved patient's ID is 1L
        Assertions.assertThat(patient.getId()).isEqualTo(1L);
    }

    //JUnit Test for Get All Patients
    @Test
    public void  getListOfPatientsTest(){
        List<Patient> patients = patientRepository.findAll();
        Assertions.assertThat(patients.size()).isGreaterThan(0);
    }

    //JUnit Test for Save Patient
    @Test
    public void savePatientTest(){
        Patient patient = Patient.builder()
                .fullName("Daniel Brookes")
                .email("danielbrk@yahoo.com")
                .number("(0191) 403 5384")
                .sex("Male")
                .age("39")
                .address("11 Phalp Street South Hetton DH6 2SS")
                .diagnosis("Rheumatoid lung disease with rheumatoid arthritis of unspecified site")
                .build();

        patientRepository.save(patient);
        Assertions.assertThat(patient.getId()).isGreaterThan(0);
    }

    //JUnit Test for Update Patient
    @Test
    public void updatePatient(){
        Patient patient = patientRepository.findAllById(1L).get();

        patient.setFullName("Daniel Brookes");
        patient.setEmail("danielbrk@yahoo.com");
        patient.setNumber("(0191) 403 5384");
        patient.setSex("Male");
        patient.setAge("39");
        patient.setAddress("11 Phalp Street South Hetton DH6 2SS");
        patient.setDiagnosis("Rheumatoid lung disease with rheumatoid arthritis of unspecified site");

        Patient patientUpdated = patientRepository.save(patient);

        Assertions.assertThat(patientUpdated.getFullName()).isEqualTo("Daniel Brookes");
        Assertions.assertThat(patientUpdated.getEmail()).isEqualTo("danielbrk@yahoo.com");
        Assertions.assertThat(patientUpdated.getNumber()).isEqualTo("(0191) 403 5384");
        Assertions.assertThat(patientUpdated.getSex()).isEqualTo("Male");
        Assertions.assertThat(patientUpdated.getAge()).isEqualTo("39");
        Assertions.assertThat(patientUpdated.getAddress()).isEqualTo("11 Phalp Street South Hetton DH6 2SS");
        Assertions.assertThat(patientUpdated.getDiagnosis()).isEqualTo("Rheumatoid lung disease with rheumatoid arthritis of unspecified site");

    }

    //JUnit Test for Patient Not Found
    @Test
    public void patientNotFoundTest() {
        // Try to find a patient with an ID that doesn't exist
        Optional<Patient> patientOptional = patientRepository.findById(999L);

        // Verify that the patient is not found
        Assertions.assertThat(patientOptional).isEmpty();
    }

    //JUnit Test for Patient Not Found - NoSuchElementException
    @Test
    public void patientNotFoundNoSuchElementExceptionTest() {
        // Try to find a patient with an ID that doesn't exist
        Optional<Patient> patientOptional = patientRepository.findById(999L);

        // Verify that a NoSuchElementException is thrown when trying to get the patient
        Assertions.assertThatThrownBy(patientOptional::get)
                .isInstanceOf(NoSuchElementException.class);
    }

    //JUnit Test for Delete Patient
    @Test
    public void deletePatientTest(){
        Patient patient = patientRepository.findById(1L).get();

        patientRepository.deleteById(1L);
        Patient patient1 = null;
        Optional<Patient> optionalPatient = patientRepository.findByEmail("danielbrk@yahoo.com");

        if (optionalPatient.isPresent()){
            patient1 = optionalPatient.get();
        }
        Assertions.assertThat(patient1).isNull();
    }


}
