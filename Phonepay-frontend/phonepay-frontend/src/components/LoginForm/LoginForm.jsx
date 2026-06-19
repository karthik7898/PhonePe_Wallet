import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/api";
import "./LoginForm.css";

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    pin: "",
  });

  const [errors, setErrors] = useState({});
  const [showPin, setShowPin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pin") {
      setFormData({
        ...formData,
        pin: value.replace(/\D/g, "").slice(0, 4),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    const err = {};

    if (!/^\d{10}$/.test(formData.phone)) {
      err.phone = "Phone number must be 10 digits";
    }

    if (formData.pin.length !== 4) {
      err.pin = "PIN must be 4 digits";
    }

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const err = validateForm();
    setErrors(err);
    if (Object.keys(err).length) return;

    try {
      const res = await API.post("/users/login", {
        phoneNumber: formData.phone,
        pin: formData.pin,
      });

      // 🔥 IMPORTANT FIX
      const user = res.data.data || res.data;

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: user.name,
          upiId: user.upiId,
          phoneNumber: user.phoneNumber,
        })
      );

      if (onLogin) onLogin();
      navigate("/dashboard");

    } catch (error) {
      setErrors({ general: "Invalid phone number or PIN" });
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-main-container">
        <div className="login-card-container">

          <h1 className="login-logo">MRU PAY</h1>
          <h2>Login</h2>

          {errors.general && <div className="login-error-box">{errors.general}</div>}

          <form onSubmit={handleSubmit}>

            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span>{errors.phone}</span>}

            <div className="login-pin-input-container">
              <input
                type={showPin ? "text" : "password"}
                name="pin"
                placeholder="4 digit PIN"
                value={formData.pin}
                onChange={handleChange}
              />
              <button type="button" onClick={() => setShowPin(!showPin)}>👁️</button>
            </div>

            {errors.pin && <span>{errors.pin}</span>}

            <button type="submit">Login</button>

          </form>

          <p>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;
