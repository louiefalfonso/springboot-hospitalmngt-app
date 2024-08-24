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
    // create filter all apointments based on doctor, status and date
    const filterAppointments = (appointments, filter) => {
      return appointments.filter((appointment) => {
        return (
          appointment.doctor
            .toLowerCase()
            .includes(filter.doctorName.toLowerCase()) &&
          appointment.status
            .toLowerCase()
            .includes(filter.status.toLowerCase()) &&
          appointment.date
            .toLowerCase()
            .includes(filter.date.toLowerCase())
        );
      });
    };

    const [searchQuery, setSearchQuery] = useState({
      doctorName: "",
      status: "",
      date: "",
    });

    const handleSearch = (e) => {
      setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
    };

    const filteredAppointments = filterAppointments(appointments, searchQuery);

    const getStatusColor = (status) => {
      switch (status) {
        case "Urgent":
          return "bg-danger text-white";
        case "Confirmed":
          return "bg-success text-white";
        case "Reschedule":
          return "bg-warning text-black";
        case "Completed":
          return "bg-purple text-white";
        case "Cancelled":
          return "bg-black text-white";
        default:
          return "bg-info text-white dark:bg-darkmuted";
      }
    };
  

    
  return (
    <>
     <div className="overflow-auto">
      <form
        onSubmit={(e) => e.preventDefault()}
        onChange={handleSearch}
        value={searchQuery}
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
            value={searchQuery.doctorName}
            onChange={handleSearch}
            placeholder="Doctor Name"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-900">
            Status:
          </label>
          <select
            name="status"
            className="form-input"
            value={searchQuery.status}
            onChange={handleSearch}
            placeholder="Status"
            required

          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Urgent">Urgent</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Reschedule">Reschedule</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
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
            value={searchQuery.date}
            onChange={handleSearch}
            placeholder="Date"
          />
        </div>
        <div className="sm:col-span-1 flex items-center justify-center">
          <button
            className="mt-5 btn bg-info border border-info rounded text-white transition-all duration-300 hover:bg-info/[0.85] hover:border-info/[0.85] w-full"
            type="submit"
            onClick={handleSearch}
            disabled={searchQuery.doctorName === "" && searchQuery.status === "" && searchQuery.date === ""}

          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setSearchQuery({ doctorName: "", status: "", date: "" })}
            disabled={searchQuery.doctorName === "" && searchQuery.status === "" && searchQuery.date === ""}
            className="mt-5 ml-2 btn bg-black border border-black rounded text-white transition-all duration-300 hover:bg-black/[0.85] hover:border-black/[0.85] w-full"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
    <div className="overflow-auto">
      <table className="min-w-[640px] w-full mt-4 table-striped">
                <thead>
                  <tr className="ltr:text-left rtl:text-right">
                    <th>Assigned Attendee</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="text-center">
  
                </tbody>
              </table>
    </div>

    </>
  )
};

export default SearchAppointment;
