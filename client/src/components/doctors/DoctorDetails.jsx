import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorService from "../../services/DoctorService.js";
import Modal from "../layout/Modal";
import { createPortal } from "react-dom";
import UpdateDoctor from "./UpdateDoctor.jsx";
import DeleteDoctor from "./DeleteDoctor.jsx";

const DoctorDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params;
    const [currentDoctor, setCurrentDoctor] = useState({});
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
    
  return (
    <>
      <div className="flex flex-col gap-4 min-h-[calc(100vh-212px)]">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Doctor Details</h2>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="btn flex items-center gap-1.5 bg-purple border border-purple rounded-md text-white transition-all duration-300 hover:bg-purple/[0.85] hover:border-purple/[0.85]"
              >
                Back
              </button>
            </div>
            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4">
                <thead>
                  <tr className="ltr:text-left rtl:text-right">
                    <th>Specialist Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Specialization</th>
                    <th>Schedule</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(currentDoctor).length > 0 ? (
                    <tr>
                      <td>
                      Dr. {currentDoctor.firstName} {currentDoctor.lastName}
                      </td>
                      <td>{currentDoctor.email}</td>
                      <td>{currentDoctor.department}</td>
                      <td>{currentDoctor.specialization}</td>
                      <td>{currentDoctor.schedule}</td>
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
                  ) : (
                    <tr>
                      <td colSpan={5}>Loading...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isUpdateModalOpen &&
        createPortal(
          <Modal
            isOpen={isUpdateModalOpen}
            toggleModal={toggleUpdateModal}
            title="Update Doctor Details"
            divClass="flex items-start justify-center min-h-screen px-4"
            content={<UpdateDoctor toggleModal={toggleUpdateModal} />}
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
            content={<DeleteDoctor toggleModal={toggleDeleteModal} />}
            sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
            spaceClass="p-5 space-y-4"
          />,
          document.body
        )}
    </>
  );
};

export default DoctorDetails;
