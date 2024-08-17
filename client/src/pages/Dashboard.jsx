import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import MainLayout from "../components/layout/MainLayout";

const Dashboard = () => {
 
  return (
    <MainLayout>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        Dashboard Page
      </div>
      <Toaster />
    </MainLayout>
  );
};

export default Dashboard;
