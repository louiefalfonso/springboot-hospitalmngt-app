package com.hospitalspring.app.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto {

    private Long id;
    private String fullName;
    private String email;
    private String age;
    private String sex;
    private String address;
    private String number;
    private String diagnosis;
    private String type;

    public String getFullName() {
        return fullName;
    }

    public String getEmail(){
        return email;
    }

   public String getAge(){
        return age;
   }

   public String getSex(){
        return sex;
   }

   public String getNumber(){
        return number;
   }

   public String getAddress(){
        return address;
   }

   public String getDiagnosis(){
        return diagnosis;
   }

    public String getType() {
        return type;
    }
}


