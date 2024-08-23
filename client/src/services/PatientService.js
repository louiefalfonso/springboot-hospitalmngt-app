import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URI_PATIENTS;

const PatientService = {

    addNewPatient(id) {
        return axios.post(API_BASE_URL, id);
    },

    getAllPatients: async () => {
        return axios.get(API_BASE_URL);
    },

    getPatientById(id) {
        return axios.get(`${API_BASE_URL}/${id}`);
    },

    updateCurrentPatient(currentPatient, id) {
        return axios.put(`${API_BASE_URL}/${id}`, currentPatient);
    },

    deletePatient(id) {
        return axios.delete(`${API_BASE_URL}/${id}`);
    },
}

export default PatientService