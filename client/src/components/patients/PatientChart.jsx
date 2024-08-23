import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Scatter,
} from "recharts";
import PatientService from "../../services/PatientService";

const PatientChart = () => {
  const [patients, setPatients] = useState([]);

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

  // Process data to extract based on type of patients
  const patientCounts = {};
  patients.forEach((patient) => {
    const type = patient.type;
    if (!patientCounts[type]) {
      patientCounts[type] = 0;
    }
    patientCounts[type]++;
  });

  // Convert counts to chart data
  const chartData = Object.keys(patientCounts).map((type) => ({
    type,patientCount: patientCounts[type],
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
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip formatter={(value) => value} />
  
            <Area
              type="monotone"
              dataKey="patientCount"
              stroke="#009ef7"
              fill="#009ef7"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default PatientChart;
