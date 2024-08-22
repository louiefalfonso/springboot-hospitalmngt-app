import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppointmentService from "../../services/AppointmentService.js";
import Modal from "../layout/Modal";
import { createPortal } from "react-dom";
import UpdateAppointment from "./UpdateAppointment.jsx";
import DeleteAppointment from "./DeleteAppointment.jsx";

const AppoinmentDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [currentAppointment, setCurrentAppointment] = useState({});
  const [error, setError] = useState(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleUpdateModal = () => {
    setIsUpdateModalOpen(!isUpdateModalOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

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
        <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Appointment Details</h2>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="btn flex items-center gap-1.5 bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
            >
              Back
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="space-y-4">
              {Object.keys(currentAppointment).length > 0 ? (
                <div className="space-y-4">
                  <p>
                    <span className="font-bold">Date:</span>{" "}
                    {currentAppointment.date}
                  </p>
                  <p>
                    <span className="font-bold">Status:</span>{" "}
                    {currentAppointment.status}
                  </p>
                  <p>
                    <span className="font-bold">Scheduled Time:</span>{" "}
                    {currentAppointment.time}
                  </p>
                  <p>
                    <span className="font-bold">Comments:</span>
                  </p>
                  <p>{currentAppointment.comments}</p>
                  <p>
                    <button
                      type="button"
                      onClick={toggleUpdateModal}
                      className="btn py-1 px-3.5  mr-2 text-xs bg-info border border-info border-info rounded-md text-white transition-all duration-300 hover:bg-info/[0.85] hover:border-info/[0.85]"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={toggleDeleteModal}
                      className="btn py-1 px-3.5 text-xs bg-danger border border-danger border-danger rounded-md text-white transition-all duration-300 hover:bg-danger/[0.85] hover:border-danger/[0.85]"
                    >
                      Delete
                    </button>
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p>No Details Found</p>
                </div>
              )}
            </div>
          </div>
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            {Object.keys(currentAppointment).length > 0 ? (
              <div className="space-y-4">
                <p>
                  <span className="font-bold">Assigned Attendee:</span> Dr:{" "}
                  {currentAppointment.doctor.firstName}{" "}
                  {currentAppointment.doctor.lastName}
                </p>
                <p>
                  <span className="font-bold">Department:</span>{" "}
                  {currentAppointment.doctor.department}
                </p>
                <p>
                  <span className="font-bold">Specialization:</span>{" "}
                  {currentAppointment.doctor.specialization}
                </p>
                <p>Email Address: {currentAppointment.doctor.email}</p>
                <p>Phone Number: {currentAppointment.doctor.number}</p>
                <p>Schedule: {currentAppointment.doctor.schedule}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p>No Attendee Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isUpdateModalOpen &&
        createPortal(
          <Modal
            isOpen={isUpdateModalOpen}
            toggleModal={toggleUpdateModal}
            title="Update Appointment Details"
            divClass="flex items-start justify-center min-h-screen px-4"
            content={<UpdateAppointment toggleModal={toggleUpdateModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
      {isDeleteModalOpen &&
        createPortal(
          <Modal
            isOpen={isDeleteModalOpen}
            toggleModal={toggleDeleteModal}
            title="Delete Doctor"
            divClass="flex items-center justify-center min-h-screen px-4"
            content={<DeleteAppointment toggleModal={toggleDeleteModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
    </>
  );
};

export default AppoinmentDetails;
