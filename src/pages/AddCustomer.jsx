import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AddCustomer = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    age: '',
    country: '',
    gender: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert age to number if needed
      const payload = {
        ...formData,
        age: parseInt(formData.age),
        number: formData.number.toString() // Ensure number is string if backend expects it
      };

      const response = await axios.post(
        'https://crud-server-liard.vercel.app/api/users',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      toast.success('Customer added successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error details:', error.response?.data);
      toast.error(
        error.response?.data?.message || 
        'Failed to add customer. Please check your data and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <Helmet>
        <title>Add Customer</title>
      </Helmet>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white dark:bg-[#1e1e2f] p-6 transition-colors duration-200"
        onSubmit={handleSubmit}
      >
        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Ali..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors duration-200"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Hassan..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors duration-200"
              required
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alf@gmail.com"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors duration-200"
              required
            />
          </div>

          {/* Telephone */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Telephone</label>
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="011987899"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors duration-200"
              required
            />
          </div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 gap-6 mb-6">
          {/* Age */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Your Age..."
              className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors duration-200"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors duration-200"
              required
            >
              <option value="">Choose here...</option>
              <option value="Palestine">Palestine</option>
              <option value="Syria">Syria</option>
              <option value="Egypt">Egypt</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-colors duration-200"
              required
            >
              <option value="">Choose here...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200 ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Adding...' : 'Add Customer'}
        </button>
      </motion.form>
    </>
  );
};

export default AddCustomer;