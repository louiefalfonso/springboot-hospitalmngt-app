import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import AppointmentService from "../../services/AppointmentService.js";
import {counterdata} from '../data/counterdata.js'

const CountAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await AppointmentService.getAllAppointments();
        const statusCounts = {};

        response.data.forEach((appointment) => {
          const status = appointment.status;
          if (!statusCounts[status]) {
            statusCounts[status] = 0;
          }
          statusCounts[status]++;
        });

        setAppointments(statusCounts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Urgent":
        return "bg-danger text-white";
      case "Confirmed":
        return "bg-success text-white";
      case "Reschedule":
        return "bg-warning text-black";
      case "Completed":
        return "bg-purple text-white";
      case "Cancelled":
        return "bg-black text-white";
      default:
        return "bg-info text-white dark:bg-darkmuted";
    }
  };

  return (
    <>
      <div className="overflow-auto">
        <div className="flex flex-nowrap gap-4">
          {Object.keys(appointments).map((status) => (
            <div
              key={status}
              className={`${getStatusColor(status)}
            flex-1 mt-4 text-center border rounded py-9 border-black/10 dark:bg-darklight dark:border-darkborder`}
            >
              <div className="dark:bg-white/5 text-gray flex flex-nowrap gap-4 flex-col">
                <h1 className="mt-6 text-4xl font-semibold dark:text-white">
                  <CountUp end={appointments[status]} />
                </h1>
              </div>
              <p
                className={`${getStatusColor(
                  status
                )} inline-flex items-center rounded-full text-xs justify-center px-1.5 py-0.5 mt-4`}
              >
                {" "}
                {status} Cases
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CountAppointments;
