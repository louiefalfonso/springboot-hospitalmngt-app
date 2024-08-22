import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import MainLayout from "../components/layout/MainLayout";
import DoctorsList from "../components/doctors/DoctorsList";
import AppointmentList from "../components/appointments/AppointmentList";
import ChartAppointments from "../components/appointments/ChartAppointments";

const Dashboard = () => {
 
  return (
    <MainLayout>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="gap-5 p-5 bg-white border rounded dark:bg-darklight dark:border-darkborder md:col-span-2 xl:col-span-2 border-black/10">
            <h2 className="mb-4 text-base font-semibold text-black dark:text-white/80">
              Appointment Stats
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <ChartAppointments />
            </div>
          </div>
          <div className="gap-6 p-5 bg-white border rounded dark:bg-darklight dark:border-darkborder md:col-span-2 xl:col-span-2 border-black/10">
            <div className="grid grid-cols-1 gap-4">
              <AppointmentList />
            </div>
          </div>
          <div className="gap-6 p-5 bg-white border rounded dark:bg-darklight dark:border-darkborder md:col-span-2 xl:col-span-2 border-black/10">
            <div className="grid grid-cols-1 gap-4">
              <DoctorsList />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </MainLayout>
  );
};

export default Dashboard;
