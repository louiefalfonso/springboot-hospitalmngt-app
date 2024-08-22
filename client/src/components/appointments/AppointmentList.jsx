import React, { useState, useEffect } from "react";
import AppointmentService from "../../services/AppointmentService.js";
import { Link } from "react-router-dom";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

   useEffect(() => {
     const fetchAppointments = async () => {
       try {
         const response = await AppointmentService.getAllAppointments();
         const urgentAppointments = response.data.filter(
           (appointment) => appointment.status === "Urgent"
         );
         setAppointments(urgentAppointments);
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
        default:
          return "bg-muted text-white dark:bg-darkmuted";
      }
    };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Urgent Appointments</h2>
              <Link to="/appointments">
                <button
                  type="button"
                  className="btn py-1 px-3.5 text-xs bg-info border border-info border-info rounded-md text-white transition-all duration-300 hover:bg-info/[0.85] hover:border-info/[0.85]"
                >
                  View Full List
                </button>
              </Link>
            </div>
            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4 table-striped">
                <thead>
                  <tr className="ltr:text-left rtl:text-right">
                    <th>Assigned Attendee</th>
                    <th>Specialization</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Time</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {appointments.slice(0, 5).map((appointment, index) => (
                    <tr className="text-muted" key={appointment.id || index}>
                      <td>
                        Dr. {appointment.doctor.firstName}{" "}
                        {appointment.doctor.lastName}
                      </td>
                      <td>{appointment.doctor.specialization}</td>
                      <td>{appointment.doctor.department}</td>
                      <td
                        className={`${getStatusColor(
                          appointment.status
                        )} inline-flex items-center rounded-full text-xs justify-center px-1.5 py-0.5 mt-4`}
                      >
                        {appointment.status}
                      </td>
                      <td>{appointment.time}</td>
                      <td>{appointment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentList;
