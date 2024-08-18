import React, { useState } from "react";
import Modal from "../layout/Modal";
import { doctordata } from "../data/doctorData.js";
import AddDoctor from "./AddDoctor.jsx";

const Doctors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
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
              <Modal
                isOpen={isModalOpen}
                toggleModal={toggleModal}
                title="Add New Doctor"
                divClass="flex items-start justify-center min-h-screen px-4"
                content={<AddDoctor/>}
                onDiscard={toggleModal}
                sizeClass="relative w-full max-w-lg p-0 my-8 overflow-hidden bg-white border rounded-lg border-black/10 dark:bg-darklight dark:border-darkborder"
                spaceClass="p-5 space-y-4"
              />
            </div>

            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4">
                <thead>
                  <tr className="ltr:text-left rtl:text-right">
                    <th>Specialist Name</th>
                    <th>Department</th>
                    <th>Service</th>
                    <th>Schedule</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {doctordata.map((item, index) => (
                    <tr className="text-muted" key={item.id || index}>
                      <td>{item.name}</td>
                      <td>{item.department}</td>
                      <td>{item.service}</td>
                      <td>{item.schedule}</td>
                      <td>
                        <button
                          className="text-danger ltr:ml-2 rtl:mr-2"
                          //onClick={() => handleRemove(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="inline-block w-5 h-5"
                          >
                            <path
                              fill="currentColor"
                              d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
                            ></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Doctors