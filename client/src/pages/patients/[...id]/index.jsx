import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";
import PatientDetails from "../../../components/patients/PatientDetails";

const PatientPage = () => {
    const { id } = useParams();
    
  return (
    <>
        <MainLayout>
           <PatientDetails patientId={id}/> 
        </MainLayout>
    </>
  );
};

export default PatientPage;
