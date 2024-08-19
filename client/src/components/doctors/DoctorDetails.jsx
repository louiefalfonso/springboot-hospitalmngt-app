import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorService from "../../services/DoctorService.js";

const DoctorDetails = () => {
    const navite = useNavigate();
    const params = useParams();
    const { id } = params;
    const [currentDoctor, setCurrentDoctor] = useState({});
    const [error, setError] = useState(null);

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
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Object.keys(currentDoctor).length > 0 ? (
                    <tr>
                      <td>
                        {currentDoctor.firstName} {currentDoctor.lastName}
                      </td>
                      <td>{currentDoctor.email}</td>
                      <td>{currentDoctor.department}</td>
                      <td>{currentDoctor.specialization}</td>
                      <td>{currentDoctor.schedule}</td>
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
    </>
  );
};

export default DoctorDetails;
