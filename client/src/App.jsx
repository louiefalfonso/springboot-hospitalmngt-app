import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AppoinmentsPage from "./pages/AppoinmentsPage";
import DoctorsPage from "./pages/DoctorsPage";
import PatientsPage from "./pages/PatientsPage";
import DoctorPage from "./pages/doctors/[...id]";
import AppoinmentPage from "./pages/appointments/[...id]";


function App() {
  return (
    <>
      <main className="w-full min-h-screen bg-[#f3f4f6] ">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<AppoinmentsPage />} />
          <Route path="/appointments/:id" element={<AppoinmentPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/doctors/:id" element={<DoctorPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
