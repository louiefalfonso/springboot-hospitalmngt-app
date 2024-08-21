import React, { useState, useEffect } from "react";
import Modal from "../layout/Modal";
import AppointmentService from '../../services/AppointmentService.js'
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import AddAppointment from "./AddAppointment.jsx";
import { Toaster } from "react-hot-toast";

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
     const [isModalOpen, setIsModalOpen] = useState(false);

     const toggleModal = () => {
       setIsModalOpen(!isModalOpen);
     };


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
          return "red-500";
        case "Confirmed":
          return "blue-500";
        case "Completed":
          return "green-400";
        case "Reschedule":
          return "lime-500";
        default:
          return "blue-500";
      }
    };

  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Full Appointment List</h2>
              <button
                type="button"
                onClick={toggleModal}
                className="btn flex items-center gap-1.5 bg-success border border-success rounded-md text-white transition-all duration-300 hover:bg-green/[0.85] hover:border-green/[0.85]"
              >
                + Create Appointment
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
                        className={`text-${getStatusColor(appointment.status)}`}
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
