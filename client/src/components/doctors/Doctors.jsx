
import React, { useState, useEffect } from "react";
import Modal from "../layout/Modal";
import AddDoctor from "./AddDoctor.jsx";
import DoctorService from "../../services/DoctorService.js";
import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await DoctorService.getAllDoctors();
        setDoctors(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Specialist Details</h2>
              <button
                type="button"
                onClick={toggleModal}
                className="btn flex items-center gap-1.5 bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
              >
                Add Specialist
              </button>
            </div>
            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4">
                <thead>
                  <tr className="ltr:text-left rtl:text-right">
                    <th>Specialist Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Service</th>
                    <th>Schedule</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {doctors.map((doctor, index) => (
                    <tr className="text-muted" key={doctor.id || index}>
                      <td>
                        Dr.{doctor.firstName} {doctor.lastName}
                      </td>
                      <td>{doctor.email}</td>
                      <td>{doctor.department}</td>
                      <td>{doctor.specialization}</td>
                      <td>{doctor.schedule}</td>
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
            title="Add New Doctor"
            divClass="flex items-start justify-center min-h-screen px-4"
            content={<AddDoctor toggleModal={toggleModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
      <Toaster />
    </>
  );
};

export default Doctors;
