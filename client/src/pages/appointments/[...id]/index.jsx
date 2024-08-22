import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../../components/layout/MainLayout";
import AppoinmentDetails from "../../../components/appointments/AppoinmentDetails";

const AppointmentPage = () => {
    const { id } = useParams();
  return (
    <>
      <MainLayout>
        <AppoinmentDetails appointmentId={id} />
      </MainLayout>
    </>
  );
};

export default AppointmentPage;
