import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";

const PatientPage = () => {
    const { id } = useParams();
    
  return (
    <>
        <MainLayout>
            
        </MainLayout>
    </>
  );
};

export default PatientPage;
