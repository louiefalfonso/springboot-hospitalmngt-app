import React, { useState, useEffect } from "react";
import AppointmentService from "../../services/AppointmentService.js";

const SearchAppointment = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const response = await AppointmentService.getAllAppointments();
          setAppointments(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchAppointments();
    }, []);
    
  return (
    <div className="overflow-auto">
      <form
        //onSubmit={handleSearch}
        className="grid grid-cols-4 sm:grid-cols-4 gap-4"
      >
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-900">
            Doctor Name:
          </label>
          <input
            type="text"
            name="doctorName"
            className="form-input"
            //value={searchQuery.doctorName}
            //onChange={handleSearch}
          />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-900">
            Status:
          </label>
          <select
            name="status"
            className="form-input"
            //value={searchQuery.status}
            //onChange={handleSearch}
          >
            <option value="">All</option>
            <option value="Urgent">Urgent</option>
            <option value="Pending">Pending</option>
            <option value="Reschedule">Reschedule</option>
          </select>
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-900">
            Date:
          </label>
          <input
            type="date"
            name="date"
            className="form-input"
            //value={searchQuery.date}
            //onChange={handleSearch}
          />
        </div>
        <div className="sm:col-span-1 flex items-center justify-center">
          <button
            className="mt-5 btn bg-info border border-info rounded text-white transition-all duration-300 hover:bg-info/[0.85] hover:border-info/[0.85] w-full"
            //type="submit"
          >
            Search
          </button>
          <button
            type="button"
            //onClick={handleReset}
            className="mt-5 ml-2 btn bg-black border border-black rounded text-white transition-all duration-300 hover:bg-black/[0.85] hover:border-black/[0.85] w-full"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchAppointment;
