import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Helmet} from "react-helmet";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Required')
        .min(3, 'Must be at least 3 characters'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Must be at least 6 characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          'https://crud-server-liard.vercel.app/api/auth/register',
          values
        );
        
        // Store the token in localStorage or context
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        toast.success('Registration successful!');
        navigate('/login'); // Redirect to dashboard after successful registration
      } catch (error) {
        let errorMessage = 'Registration failed';
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = 'User already exists';
          } else {
            errorMessage = error.response.data.message || errorMessage;
          }
        }
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
     <Helmet>
                <title>Register</title>
            </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="shadow-neutral-300 shadow-2xs flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <motion.h1
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-10 text-center text-4xl font-bold tracking-tight text-gray-900"
          >
            Sign Up
          </motion.h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="username" className="flex text-sm/6 font-medium text-gray-900 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                placeholder="Enter your username"
                className="block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none sm:text-sm/6"
              />
              {formik.touched.username && formik.errors.username ? (
                <p className="text-sm flex text-red-500 mt-1">{formik.errors.username}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="flex text-sm/6 font-medium text-gray-900 mb-1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Enter your email"
                className="block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none sm:text-sm/6"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-sm flex text-red-500 mt-1">{formik.errors.email}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="password" className="flex text-sm/6 font-medium text-gray-900 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Enter your password"
                  className="block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none sm:text-sm/6 pr-10"
                />
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </div>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <p className="text-sm flex text-red-500 mt-1">{formik.errors.password}</p>
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
              {' '}
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </>
  );
}