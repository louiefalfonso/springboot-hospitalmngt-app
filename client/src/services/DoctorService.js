import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URI_DOCTORS;

const DoctorService = {
  addNewDoctor(id) {
    return axios.post(API_BASE_URL, id);
  },

  getAllDoctors: async () => {
    return axios.get(API_BASE_URL);
  },

  getDoctorById(id) {
    return axios.get(`${API_BASE_URL}/${id}`);
  },
  
};

export default DoctorService;