import React, { useState, useEffect } from "react";
import AppointmentService from "../../services/AppointmentService.js";

const CountAppointments = () => {
  return (
    <>
      <div className="gap-5 p-5 bg-white border rounded dark:bg-darklight dark:border-darkborder md:col-span-2 xl:col-span-2 border-black/10">
        <h2 className="mb-4 text-base font-semibold text-black dark:text-white/80">
          Appointment Stats
        </h2>
        <div className="grid grid-cols-1 gap-4">
            
        </div>
      </div>
    </>
  );
};

export default CountAppointments;
