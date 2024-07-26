// src/SignupForm.js
import React, { useState } from "react";
import "./SignupForm.css";

const SignupForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Validate fields in real-time
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };

    switch (name) {
      case "name":
        errors.name =
          value.length < 3 ? "Name must be at least 3 characters long" : "";
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errors.email = !emailPattern.test(value) ? "Email is not valid" : "";
        break;
      case "password":
        errors.password =
          value.length < 6 ? "Password must be at least 6 characters long" : "";
        break;
      case "confirmPassword":
        errors.confirmPassword =
          value !== formValues.password ? "Passwords do not match" : "";
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      Object.values(formErrors).every((error) => error === "") &&
      Object.values(formValues).every((value) => value !== "")
    ) {
      // Handle form submission
      alert("Form submitted successfully!");
    } else {
      alert("Please fix the errors in the form");
    }
  };

  return (
    <div className="signup-form-container">
      <form
        className="signup-form"
        style={{ minWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className={formErrors.name ? "error" : ""}
          />
          {formErrors.name && (
            <p className="error-message">{formErrors.name}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className={formErrors.email ? "error" : ""}
          />
          {formErrors.email && (
            <p className="error-message">{formErrors.email}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            className={formErrors.password ? "error" : ""}
          />
          {formErrors.password && (
            <p className="error-message">{formErrors.password}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            className={formErrors.confirmPassword ? "error" : ""}
          />
          {formErrors.confirmPassword && (
            <p className="error-message">{formErrors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" disabled={isSubmitting}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
