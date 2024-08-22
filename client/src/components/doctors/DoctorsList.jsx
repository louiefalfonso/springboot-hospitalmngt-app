import React, { useState, useEffect } from "react";
import DoctorService from "../../services/DoctorService.js";
import { Link } from "react-router-dom";

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);

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
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Attendee & Resident List</h2>
              <Link to="/doctors">
                <button
                  type="button"
                  className="btn py-1 px-3.5 text-xs bg-info border border-info border-info rounded-md text-white transition-all duration-300 hover:bg-info/[0.85] hover:border-info/[0.85]"
                >
                  View Full List
                </button>
              </Link>
            </div>
            <div className="overflow-auto">
              <table className="min-w-[640px] w-full mt-4 table-striped">
                <thead>
                  <tr className="ltr:text-left rtl:text-right">
                    <th>Specialist Name</th>
                    <th>Department</th>
                    <th>Specialization</th>
                    <th>Schedule</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {doctors.slice(0, 5).map((doctor, index) => (
                    <tr className="text-muted" key={doctor.id || index}>
                      <td>
                        Dr. {doctor.firstName} {doctor.lastName}
                      </td>
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
    </>
  );
};

export default DoctorsList;
