import React from 'react'
import MainLayout from "../components/layout/MainLayout";
import Appointment from '../components/appointments/Appointment';

const AppoinmentsPage = () => {
  return (
    <>
      <MainLayout>
        <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
          <Appointment/>
        </div>
      </MainLayout>
    </>
  );
}

export default AppoinmentsPage