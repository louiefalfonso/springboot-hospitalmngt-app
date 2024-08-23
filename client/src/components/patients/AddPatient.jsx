import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PatientService from "../../services/PatientService";
import toast, { Toaster } from "react-hot-toast";

const AddPatient = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [type, setType] = useState("");
 
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const newPatient = { fullName, email, age, sex, address, number, diagnosis, type };

    PatientService.addNewPatient(newPatient)
      .then(() => {
        navigate("/patients");
        toast.success("Patient added successfully!");
        setIsModalOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };

  useEffect(() => {
    if (id) {
      const fetchNewPatient = async () => {
        try {
          const response = await PatientService.getPatientById(id);
          const newPatient = response.data;

          setFullName(newPatient.fullName);
          setEmail(newPatient.email);
          setAge(newPatient.age);
          setSex(newPatient.sex);
          setAddress(newPatient.address);
          setNumber(newPatient.number);
          setDiagnosis(newPatient.diagnosis);
          setType(newPatient.type);

        } catch (error) {
          setError(error.message);
          console.error(error);
        }
      };

      fetchNewPatient();
    }
  }, [id]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        <div className="p-5 bg-white border rounded border-black/10 dark:bg-darklight dark:border-darkborder">
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="sm:col-span-1">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-900"
              >
                First Name:
              </label>
              <input
                placeholder="Full Name"
                required
                type="text"
                className="form-input"
                id="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-900"
              >
                Age:
              </label>
              <input
                placeholder="Age"
                required
                type="text"
                className="form-input"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="sex"
                className="block text-sm font-medium text-gray-900"
              >
                Gender:
              </label>
              <select
                required
                type="text"
                className="form-input"
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email Address:
              </label>
              <input
                placeholder="Email Address"
                required
                type="text"
                className="form-input"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-900"
              >
                Home Address:
              </label>
              <input
                placeholder="Home Address"
                required
                type="text"
                className="form-input"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-900"
              >
                Contact Number:
              </label>
              <input
                placeholder="Contact Number"
                required
                type="text"
                className="form-input"
                id="numner"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-900"
              >
                Patient Type:
              </label>
              <select
                required
                type="text"
                className="form-input"
                id="typw"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Out Patient">Out Patient</option>
                <option value="Day Patient">Day Patient</option>
                <option value="In-Patient">In-Patient</option>
                <option value="Discharged Patient">Discharged Patient</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="diagnosis"
                className="block text-sm font-medium text-gray-900"
              >
                Diagnosis:
              </label>
              <textarea
                placeholder="Enter Diagnosis"
                required
                type="text"
                className="form-input"
                id="diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                style={{ height: "80px" }}
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="btn w-full py-2 px-4 text-lg bg-info border border-info border-info rounded-md text-white transition-all duration-300 hover:bg-info/[0.85] hover:border-info/[0.85]"
              >
                Add New Patient
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster duration={5000} />
    </>
  );
}

export default AddPatient