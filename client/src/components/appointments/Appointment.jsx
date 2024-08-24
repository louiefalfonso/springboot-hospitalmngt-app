import React, { useState, useEffect } from "react";

import Modal from "../layout/Modal";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import AddAppointment from "./AddAppointment.jsx";
import AppointmentService from "../../services/AppointmentService.js";
import CountAppointments from "./CountAppointments.jsx";

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => { setIsModalOpen(!isModalOpen); };

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
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="gap-5 p-5 bg-white border rounded dark:bg-darklight dark:border-darkborder md:col-span-2 xl:col-span-2 border-black/10">
            <h2 className="text-base font-semibold text-black dark:text-white/80">
              Appointment Stats
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <CountAppointments />
            </div>
          </div>
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Appointment List</h2>
              <button
                type="button"
                onClick={toggleModal}
                className="btn py-1 px-3.5 text-xs bg-success border border-success rounded-md text-white transition-all duration-300 hover:bg-success/[0.85] hover:border-success/[0.85]"
              >
                + Add Appointment
              </button>
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
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {appointments.map((appointment, index) => (
                    <tr className="text-muted" key={appointment.id || index}>
                      <td>
                        Dr. {appointment.doctor.firstName}{" "}
                        {appointment.doctor.lastName}
                      </td>
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
                      <td>
                        <Link to={`/appointments/${appointment.id}`}>
                          <button
                            type="button"
                            className="btn py-1 px-3.5 text-xs bg-info border border-info border-info rounded-md text-white transition-all duration-300 hover:bg-info/[0.85] hover:border-info/[0.85]"
                          >
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen &&
        createPortal(
          <Modal
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            title="Create Appointment"
            divClass="flex items-start justify-center min-h-screen px-4"
            content={<AddAppointment toggleModal={toggleModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
      <Toaster duration={12000} />
    </>
  );
};

export default Appointment;
