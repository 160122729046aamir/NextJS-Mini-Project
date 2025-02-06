"use client"
import axios from 'axios';
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/forgotpassword', formData);
      const data = response.data;
      console.log(data);
      alert(data.message || 'Password reset request submitted');
      setFormData({ email: '', username: '' }); // Reset form after submission
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
      alert('Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-black">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
