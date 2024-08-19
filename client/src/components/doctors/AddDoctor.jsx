import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorService from "../../services/DoctorService.js";
import toast from "react-hot-toast";


const AddDoctor = () => {
  const navite = useNavigate();
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

    const newDoctor = {
      firstName,
      lastName,
      email,
      number,
      department,
      specialization,
      schedule,
    };

    DoctorService.addNewDoctor(newDoctor)
      .then(() => {
        navite("/doctors");
        toast.success("Doctor added successfully!");
        setIsModalOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };

  useEffect(() => {
    if (id) {
      const fetchNewDoctor = async () => {
        try {
          const response = await DoctorService.getDoctorById(id);
          const newDoctor = response.data;
          setFirstName(newDoctor.firstName);
          setLastName(newDoctor.lastName);
          setEmail(newDoctor.email);
          setNumber(newDoctor.number);
          setDepartment(newDoctor.department);
          setSpecialization(newDoctor.specialization);
          setSchedule(newDoctor.schedule);
        } catch (error) {
          setError(error.message);
          console.error(error);
        }
      };
      fetchNewDoctor();
    }
  }, [id]);

  return (
    <>
      <div className="container">
        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="w-full">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900 mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="number">Number</label>
            <input
              type="text"
              className="form-control"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              className="form-control"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>
            <input
              type="text"
              className="form-control"
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="schedule">Schedule</label>
            <input
              type="text"
              className="form-control"
              id="schedule"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn flex items-center gap-1.5 bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
            >
              Add New Doctor
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDoctor;
