import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import AppointmentService from "../../services/AppointmentService.js";
import DoctorService from "../../services/DoctorService.js";
import toast, { Toaster } from "react-hot-toast";

const UpdateAppointment = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

   const handleDoctorSelect = (doctorId) => {
     setSelectedDoctor(doctorId === "" ? "" : doctorId);
   };

  useEffect(() => {
    fetchDoctors().then((doctors) => {
      setDoctors(doctors);
    });
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await DoctorService.getAllDoctors();
      const doctors = response.data.map((doctor) => ({
        id: doctor.id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
      }));
      return doctors;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedDoctor) {
      alert("Please select a doctor");
      return;
    }

    const currentAppointment = {
      date: moment(date).format("MM-DD-YYYY"),
      time,
      status,
      comments,
      doctor: selectedDoctor,
    };

  
    AppointmentService.updateCurrentAppointment(currentAppointment, id)
      .then(() => {
        navigate("/appointments");
        toast.success("Udpate Details Complete!");
        setIsModalOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };

  useEffect(() => {
    const fetchCurrentAppointment = async () => {
      try {
        const response = await AppointmentService.getAppointmentById(id);
        const update = response.data;
        const parsedDate = moment(update.date,"YYYY-MM-DD");
        setDate(parsedDate);
        setTime(update.time);
        setStatus(update.status);
        setComments(update.comments);
        setSelectedDoctor(update.doctor);

      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentAppointment();
  }, [id]);


  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="sm:col-span-1">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-900"
              >
                Appointment Date:
              </label>
              <input
                required
                type="date"
                className="form-input"
                id="date"
                value={
                  moment(date).isValid()
                    ? moment(date).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-900"
              >
                Time:
              </label>
              <input
                placeholder="Enter Time"
                required
                type="text"
                className="form-input"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="comments"
                className="block text-sm font-medium text-gray-900"
              >
                Appointment Details:
              </label>
              <textarea
                placeholder="Enter Appointment Details"
                required
                type="text"
                className="form-input"
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                style={{ height: "100px" }}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-900"
              >
                Status:
              </label>
              <select
                required
                type="text"
                className="form-input"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Urgent">Urgent</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Reschedule">Reschedule</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="doctors"
                className="block text-sm font-medium text-gray-900"
              >
                Assigned Attendee:
              </label>

              <select
                required
                className="form-input"
                id="doctors"
                value={selectedDoctor || 0}
                onChange={(e) => handleDoctorSelect(parseInt(e.target.value))}
              >
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    Dr. {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="btn w-full py-2 px-4 text-lg bg-purple border border-purple border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
              >
                Update Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster duration={12000} />
    </>
  );
};

export default UpdateAppointment;
