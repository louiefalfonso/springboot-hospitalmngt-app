import React from 'react'
import MainLayout from "../components/layout/MainLayout";
import Patients from '../components/patients/Patients';

const PatientsPage = () => {
  return (
    <>
      <MainLayout>
        <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
          <Patients/>
        </div>
      </MainLayout>
    </>
  );
}

export default PatientsPage