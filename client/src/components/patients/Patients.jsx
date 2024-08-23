import React, { useState, useEffect } from "react";
import Modal from "../layout/Modal";
import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import PatientService from "../../services/PatientService.js";
import AddPatient from "./AddPatient.jsx";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await PatientService.getAllPatients();
        setPatients(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatients();
  }, []);

  return (
    <>
      <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Patient List</h2>
          <button
            type="button"
            //onClick={toggleModal}
            className="btn py-1 px-3.5 text-xs bg-success border border-success rounded-md text-white transition-all duration-300 hover:bg-success/[0.85] hover:border-success/[0.85]"
          >
            + Add Patient
          </button>
        </div>
        <div className="overflow-auto">
          <table className="min-w-[640px] w-full mt-4 table-striped">
            <thead>
              <tr className="ltr:text-left rtl:text-right">
                <th>Full Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Diagnosis</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-center">
              {patients.map((patient) => (
                <tr key={patient._id} className="ltr:text-left rtl:text-right">
                  <td>{patient.fullName}</td>
                  <td>{patient.age}</td>
                  <td>{patient.sex}</td>
                  <td>{patient.address}</td>
                  <td className="whitespace-normal">{patient.diagnosis}</td>
                  <td>
                    <Link 
                    //</td>to={`/doctors/${doctor.id}`}
                    >
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
      {isModalOpen &&
        createPortal(
          <Modal
            isOpen={isModalOpen}
            toggleModal={toggleModal}
            title="Add New Doctor"
            divClass="flex items-start justify-center min-h-screen px-4"
            content={<AddPatient toggleModal={toggleModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
      <Toaster duration={12000} />
    </>
  );
};

export default Patients;
