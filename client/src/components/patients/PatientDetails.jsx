import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PatientService from "../../services/PatientService.js";
import Modal from "../layout/Modal";
import { createPortal } from "react-dom";
import UpdatePatient from "./UpdatePatient.jsx";
import DeletePatient from "./DeletePatient.jsx";

const PatientDetails = () => {
   const navigate = useNavigate();
   const params = useParams();
   const { id } = params;

   const [currentPatient, setCurrentPatient] = useState({});
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
     const fetchCurrentPatient = async () => {
       try {
         const response = await PatientService.getPatientById(id);
         setCurrentPatient(response.data);
       } catch (error) {
         setError(error.message);
         console.error(error);
       }
     };
     fetchCurrentPatient();
   }, [id]);


  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Patient's Details</h2>
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
            {Object.keys(currentPatient).length > 0 ? (
              <div className="space-y-4">
                <div className="overflow-auto" key={currentPatient}>
                  <table className="w-full mt-4">
                    <tbody>
                      <tr className="ltr:text-left rtl:text-right">
                        <td>Full Name:</td>
                        <td>{currentPatient.fullName}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td>Age</td>
                        <td>{currentPatient.age}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td>Gender</td>
                        <td>{currentPatient.sex}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td>Contact Number:</td>
                        <td>{currentPatient.number}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p>No Details Found</p>
              </div>
            )}
          </div>
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            {Object.keys(currentPatient).length > 0 ? (
              <div className="space-y-4" key={currentPatient}>
                <div className="overflow-auto" key={currentPatient}>
                  <table className="w-full mt-4">
                    <tbody>
                      <tr className="ltr:text-left rtl:text-right">
                        <td>Email Address:</td>
                        <td>{currentPatient.email}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td>Home Address:</td>
                        <td>{currentPatient.address}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td>Type:</td>
                        <td>{currentPatient.type}</td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td>Diagnosis</td>
                        <td className="break-words whitespace-normal">
                          {currentPatient.diagnosis}
                        </td>
                      </tr>
                      <tr className="ltr:text-left rtl:text-right">
                        <td>
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
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p>No Data Found</p>
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
            title="Update Patient Details"
            divClass="flex items-start justify-center min-h-screen px-4"
            content={<UpdatePatient toggleModal={toggleUpdateModal} />}
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
            content={<DeletePatient toggleModal={toggleDeleteModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
    </>
  );
};

export default PatientDetails;
