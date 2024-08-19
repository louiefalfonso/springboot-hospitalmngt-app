import React from "react";
import { useParams } from "react-router-dom";
import DoctorDetails from "../../../components/doctors/DoctorDetails";
import MainLayout from "../../../components/layout/MainLayout";

const DoctorPage = () => {
  const { id } = useParams();
  return (
    <>
      <MainLayout>
        <DoctorDetails doctorId={id} />
      </MainLayout>
    </>
  );
};

export default DoctorPage;
