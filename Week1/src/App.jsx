import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useNavigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

const countries = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "Los Angeles", "Chicago"],
};

const Form = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
    country: "",
    city: "",
    panNo: "",
    aadharNo: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formValues);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      navigate("/success", { state: formValues });
    } 
    else {
      setIsSubmit(true);
    }
  };



  useEffect(() => {
    const validationErrors = validate(formValues);
    setFormErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [formValues]);



  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) errors.firstName = "First Name is required!";
    if (!values.lastName) errors.lastName = "Last Name is required!";
    if (!values.username) errors.username = "Username is required!";

    if (!values.email) {
      errors.email = "Email is required!";
    } 
    else if (!regex.test(values.email)) {
      errors.email = "Invalid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } 

    else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } 

    else if  ( values.password.length > 10) {
      errors.password = "Password cannot exceed 10 characters";
    }

    if ( !values.phoneNo ) errors.phoneNo = "Phone Number is required";
    if ( !values.country ) errors.country = "Country is required";
    if ( !values.city ) errors.city = "City is required";
    if ( !values.panNo ) errors.panNo = "PAN No. is required";
    if ( !values.aadharNo ) errors.aadharNo = "Aadhar No. is required";
    return errors;

  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-2xl"
      >
       
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Login Form
          </h1>

        
        {
        Object.keys(formErrors).length === 0 && isSubmit && (
          <div className="text-green-600 text-center mb-4">
            Signed in successfully
          </div>
        )
        }

        {/* Form Fields Are Here */}

        {
        [
          ["First Name", "firstName"],
          ["Last Name", "lastName"],
          ["Username", "username"],
          ["Email", "email"],
        ].map(([label, name]) => (
          <div key={name} className="mb-4">
            <label className="block font-medium mb-1">
              {label}:
            </label>

            <input
              type="text"
              name={name}
              value={formValues[name]}
              onChange={handleChange}
              placeholder={`Enter ${label}`}
              className="w-full border border-gray-300 p-2 rounded"
            />

            <p className="text-red-500 text-sm">{formErrors[name]}</p>
          </div>
        ))}

        <div className="mb-4">

          <label className="block font-medium mb-1">
            Password:
            </label>
          <div className="flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formValues.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full border border-gray-300 p-2 rounded"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-blue-600 underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>


          </div>
          <p className="text-red-500 text-sm">
            {formErrors.password}
          </p>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">
            Phone No. (country code - number):
          </label>

          <input
            type="text"
            name="phoneNo"
            value={formValues.phoneNo}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />

          <p className="text-red-500 text-sm">
            {formErrors.phoneNo}
          </p>

        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">
            Country:
            </label>

          <select
            name="country"
            value={formValues.country}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select Country</option>
            {
            Object.keys(countries).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))
            }
          </select>

          <p className="text-red-500 text-sm">{formErrors.country}</p>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1"
          >City:
          </label>

          <select
            name="city"
            value={formValues.city}
            onChange={handleChange}
            disabled={!formValues.country}
            className="w-full border border-gray-300 p-2 rounded disabled:bg-gray-100"
          >
            <option value="">Select City</option>
            {formValues.country &&
              countries[formValues.country].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          <p className="text-red-500 text-sm">{formErrors.city}</p>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">PAN No.:</label>
          <input
            type="text"
            name="panNo"
            value={formValues.panNo}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <p className="text-red-500 text-sm">{formErrors.panNo}</p>
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Aadhar No.:</label>
          <input
            type="text"
            name="aadharNo"
            value={formValues.aadharNo}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          <p className="text-red-500 text-sm">{formErrors.aadharNo}</p>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Submit
        </button>

        
      </form>
    </div>
  );
};

const Success = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-gray-800 p-6">
      <h1 className="text-3xl font-semibold mb-4">Form Submitted Successfully!</h1>
      <pre className="bg-white p-4 rounded shadow w-full max-w-2xl overflow-auto">
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
};

export default App;
