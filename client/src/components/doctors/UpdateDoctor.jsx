import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorService from "../../services/DoctorService.js";
import toast, { Toaster } from "react-hot-toast";

const UpdateDoctor = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [schedule, setSchedule] = useState("");
  
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentDoctor = {
      firstName,
      lastName,
      email,
      number,
      department,
      specialization,
      schedule,
    };

    DoctorService.updateCurrentDoctor(currentDoctor, id)
      .then(() => {
        navigate("/doctors");
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
    const fetchCurrentDoctor = async () => {
      try {
        const response = await DoctorService.getDoctorById(id);
        const update = response.data;
        setFirstName(update.firstName);
        setLastName(update.lastName);
        setEmail(update.email);
        setNumber(update.number);
        setDepartment(update.department);
        setSpecialization(update.specialization);
        setSchedule(update.schedule);
        
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };
    fetchCurrentDoctor();
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
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-900"
              >
                First Name:
              </label>
              <input
                placeholder="First Name"
                required
                type="text"
                className="form-input"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-900"
              >
                Last Name:
              </label>
              <input
                placeholder="Last Name"
                required
                type="text"
                className="form-input"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email Address:
              </label>
              <input
                placeholder="Email"
                required
                type="email"
                className="form-input"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-900"
              >
                Contact Number:
              </label>
              <input
                placeholder="Number"
                required
                type="text"
                className="form-input"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-900"
              >
                Department:
              </label>
              <input
                placeholder="Department"
                required
                type="text"
                className="form-input"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-gray-900"
              >
                Specialization:
              </label>
              <input
                placeholder="Specialization"
                required
                type="text"
                className="form-input"
                id="specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="schedule"
                className="block text-sm font-medium text-gray-900"
              >
                Schedule:
              </label>
              <input
                placeholder="Schedule"
                required
                type="text"
                className="form-input"
                id="schedule"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="btn w-full py-2 px-4 text-lg bg-purple border border-purple border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
              >
                Update Doctor Details
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster duration={12000} />
    </>
  );
};

export default UpdateDoctor;
