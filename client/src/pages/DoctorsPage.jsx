import React from 'react'
import MainLayout from "../components/layout/MainLayout";
import Doctors from '../components/doctors/Doctors';

const DoctorsPage = () => {
  return (
    <>
      <MainLayout>
        <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
          <Doctors />
        </div>
      </MainLayout>
    </>
  );
}

export default DoctorsPage