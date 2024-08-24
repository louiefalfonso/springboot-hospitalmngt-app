import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorService from "../../services/DoctorService.js";
import AppointmentService from "../../services/AppointmentService.js";

const AssignedAppointments = () => {
    const params = useParams();
    const { id } = params;
    const [currentDoctor, setCurrentDoctor] = useState({});
    const [error, setError] = useState(null);
    const [appointments, setAppointments] = useState([]);
      const [currentAppointment, setCurrentAppointment] = useState({});

    useEffect(() => {
      const fetchCurrentDoctor = async () => {
        try {
          const response = await DoctorService.getDoctorById(id);
          setCurrentDoctor(response.data);
        } catch (error) {
          setError(error.message);
          console.error(error);
        }
      };
      fetchCurrentDoctor();
    }, [id]);

    //get only the appointments of this current doctor
     useEffect(() => {
       const fetchCurrentAppointment = async () => {
         try {
           const response = await AppointmentService.getAppointmentById(id);
           setCurrentAppointment(response.data);
         } catch (error) {
           setError(error.message);
           console.error(error);
         }
       };
       fetchCurrentAppointment();
     }, [id]);

  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <h2 className="mb-4 text-base font-semibold text-black dark:text-white/80">
              Assigned Appointments
            </h2>
            <table className="min-w-[640px] w-full mt-4 table-striped">
              <thead>
                <tr className="ltr:text-left rtl:text-right">
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
               {Object.keys(currentAppointment).length > 0 ? (
                currentAppointment.appointments.map((appointment) => (
                  
                  <tr key={appointment._id}>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.status}</td>
                  </tr>
                  ))  
                ) : (
                  <tr>
                    <td colSpan="3">No appointments found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );

  

 
};

export default AssignedAppointments;
