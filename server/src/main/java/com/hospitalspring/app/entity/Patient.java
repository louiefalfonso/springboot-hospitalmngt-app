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

    @Column(name = "fullName")
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "number")
    private String number;

    @Column(name = "sex")
    private String sex;

    @Column(name = "age")
    private String age;

    @Column(name = "address")
    private String address;

    @Column(name = "diagnosis")
    private String diagnosis;

    @Column(name = "type")
    private String type;

    public void setId(Long id) {
        this.id = id;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getNumber() {
        return number;
    }

    public String getSex() {
        return sex;
    }

    public String getAge() {
        return age;
    }

    public String getAddress() {
        return address;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public Long getId() {
        return id;
    }


}
