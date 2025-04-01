import React, { useState } from "react";
import InputText from "./InputText"; // Adjust the import based on your folder structure

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputText 
        label="First Name" 
        name="firstName" 
        value={formData.firstName} 
        onChange={handleChange} 
        placeholder="Enter your first name"
      />

      <InputText 
        label="Last Name" 
        name="lastName" 
        value={formData.lastName} 
        onChange={handleChange} 
        placeholder="Enter your last name"
      />

      <InputText 
        label="Email" 
        name="email" 
        type="email" 
        value={formData.email} 
        onChange={handleChange} 
        placeholder="Enter your email"
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
