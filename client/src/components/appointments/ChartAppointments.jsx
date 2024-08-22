import React, { useState, useEffect } from "react";
import AppointmentService from "../../services/AppointmentService.js";
import { LineChart, Line, XAxis, YAxis, CartesianGrid,Tooltip, ResponsiveContainer,
   Area, AreaChart, Scatter } from "recharts"

const ChartAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await AppointmentService.getAllAppointments();
        setAppointments(response.data);

        // Process data to extract status and counts
        const statusCounts = {};
        response.data.forEach((appointment) => {
          const status = appointment.status;
          if (!statusCounts[status]) {
            statusCounts[status] = 0;
          }
          statusCounts[status]++;
        });

        // Convert statusCounts to chart data
        const chartData = Object.keys(statusCounts).map((status) => ({
          status,
          count: statusCounts[status],
        }));
        setChartData(chartData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAppointments();
  }, []);

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
    <div className="overflow-auto">
      <ResponsiveContainer width={1100} height={300}>
        <AreaChart data={chartData}>
          <Area
            type="monotone"
            dataKey="count"
            strokeWidth={2}
            stroke="#8884d8"
            fill="#8884d8"
            isAnimationActive={true}
          />
          <Scatter dataKey="count" fill="#ffffff" />
          <XAxis dataKey="status" />
          <YAxis />
          <CartesianGrid stroke="#e5e7eb" />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartAppointments;
