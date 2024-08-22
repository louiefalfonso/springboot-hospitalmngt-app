import React, { useState, useEffect } from "react";
import DoctorService from "../../services/DoctorService.js";
import { AreaChart, Area, XAxis,YAxis,CartesianGrid, Tooltip,ResponsiveContainer, } from "recharts";

const DoctorChart = () => {
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

  // Process data to extract specialization and department counts
  const specializationCounts = {};
  const departmentCounts = {};
  doctors.forEach((doctor) => {
    const specialization = doctor.specialization;
    const department = doctor.department;
    if (!specializationCounts[specialization]) {
      specializationCounts[specialization] = 0;
    }
    if (!departmentCounts[department]) {
      departmentCounts[department] = 0;
    }
    specializationCounts[specialization]++;
    departmentCounts[department]++;
  });

  // Convert counts to chart data
  const chartData = Object.keys(specializationCounts).map((specialization) => ({
    specialization,
    specializationCount: specializationCounts[specialization],
    departmentCount: departmentCounts[specialization],
  }));

  // defaultProps error from XAxis & YAxis  Display (Dev Mode Only)
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
        return;
      }
      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return (
    <>
      <div className="overflow-auto">
        <ResponsiveContainer
          width="100%"
          height={300}
          ignoreWidth={true}
          ignoreHeight={true}
          style={{ overflowX: "auto", overflowY: "hidden" }}
        >
          <AreaChart data={chartData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="specialization" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => {
                if (name === "specializationCount")
                  return ["Specialization", value];
                if (name === "departmentCount") return ["Department", value];
                return [name, value];
              }}
            />
            <Area dataKey="specializationCount" fill="#8884d8" />
            <Area dataKey="departmentCount" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default DoctorChart