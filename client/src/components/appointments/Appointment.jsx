import React, { useState, useEffect } from "react";
import AppointmentService from '../../services/AppointmentService.js'

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const response = await AppointmentService.getAllAppointments();
          setAppointments(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchAppointments();
    }, []);

  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Full Appointment List</h2>
            </div>
            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4 table-striped">
                <thead>
                  <tr className="ltr:text-left rtl:text-right">
                    <th>Assigned Attendee</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Time</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {appointments.map((appointment, index) => (
                    <tr className="text-muted" key={appointment.id || index}>
                      <td>
                        Dr. {appointment.doctor.firstName}
                        {appointment.doctor.lastName}
                      </td>
                      <td>{appointment.doctor.department}</td>
                      <td>{appointment.status}</td>
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

export default Appointment;
