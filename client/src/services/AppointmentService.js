import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_BASE_URI_APMTS;

const AppointmentService = {

  addNewAppointment(id) {
    return axios.post(API_BASE_URL, id);
  },

  getAllAppointments: async () => {
    return axios.get(API_BASE_URL);
  },

  getAppointmentById(id) {
    return axios.get(`${API_BASE_URL}/${id}`);
  },

  updateCurrentAppointment(currentAppointment, id) {
    return axios.put(`${API_BASE_URL}/${id}`, currentAppointment);
  },

  deleteAppointment(id) {
    return axios.delete(`${API_BASE_URL}/${id}`);
  },
  
};

export default AppointmentService;