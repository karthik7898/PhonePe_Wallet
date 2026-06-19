import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    upiId: "",
    pin: "",
  });

  const [errors, setErrors] = useState({});
  const [showPin, setShowPin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pin") {
      const numericValue = value.replace(/\D/g, "").slice(0, 4);
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!formData.upiId.trim()) {
      newErrors.upiId = "UPI ID is required";
    }

    if (!formData.pin.trim()) {
      newErrors.pin = "PIN is required";
    } else if (formData.pin.length !== 4) {
      newErrors.pin = "PIN must be 4 digits";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;

    try {
      await API.post("/users/register", formData);

      alert("Registration successful!");

      navigate("/login");

    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="registration-page-container">
      <div className="registration-sidebar"></div>

      <div className="registration-main-container">
        <div className="registration-card-container">

          <div className="registration-header">
            <h1 className="registration-logo">MRU PAY</h1>
            <p className="registration-subtitle">Malla Reddy University</p>
          </div>

          <h2 className="registration-form-title">Register</h2>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="registration-form-group">
              <label className="registration-label">Full Name</label>

              <input
                className="registration-input"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
              />

              {errors.name && (
                <span className="registration-error">{errors.name}</span>
              )}
            </div>

            {/* Phone */}
            <div className="registration-form-group">
              <label className="registration-label">Phone</label>

              <input
                className="registration-input"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="10 digit number"
              />

              {errors.phoneNumber && (
                <span className="registration-error">
                  {errors.phoneNumber}
                </span>
              )}
            </div>

            {/* UPI */}
            <div className="registration-form-group">
              <label className="registration-label">UPI ID</label>

              <input
                className="registration-input"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                placeholder="example@ybl"
              />

              {errors.upiId && (
                <span className="registration-error">{errors.upiId}</span>
              )}
            </div>

            {/* PIN */}
            <div className="registration-form-group">
              <label className="registration-label">PIN</label>

              <div className="registration-pin-input-container">

                <input
                  className="registration-input registration-pin-input"
                  type={showPin ? "text" : "password"}
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  maxLength="4"
                  placeholder="4 digit PIN"
                />

                <button
                  type="button"
                  className="registration-icon-button"
                  onClick={() => setShowPin(!showPin)}
                >
                  👁️
                </button>

              </div>

              {errors.pin && (
                <span className="registration-error">{errors.pin}</span>
              )}
            </div>

            <button type="submit" className="registration-button">
              Register
            </button>

          </form>

          <p className="registration-footer">
            Already have an account?{" "}
            <Link to="/login">Sign In</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
