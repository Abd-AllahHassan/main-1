import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiCalendar, FiGlobe, FiUsers } from 'react-icons/fi';

const ViewCustomer = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://crud-server-liard.vercel.app/api/customers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        toast.error('Failed to fetch user details');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );

  if (!user) return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-screen text-center p-6"
    >
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl mb-6">User not found</p>
      <Link
        to="/home"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Back to Dashboard
      </Link>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>View Customer - {user.firstName} {user.lastName}</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            whileHover={{ x: -5 }}
            className="mb-6"
          >
            <Link
              to="/home"
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <FiArrowLeft className="mr-2" />
              Back to Dashboard
            </Link>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          >
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-6"
                >
                  <FiUser size={36} />
                </motion.div>
                <div>
                  <motion.h1 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-bold"
                  >
                    {user.firstName} {user.lastName}
                  </motion.h1>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-blue-100"
                  >
                    Customer Profile
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-600 dark:text-blue-400">
                  <FiUser className="mr-2" />
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-600 dark:text-gray-300">First Name:</span>
                    <span className="font-semibold">{user.firstName}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-600 dark:text-gray-300">Last Name:</span>
                    <span className="font-semibold">{user.lastName}</span>
                  </div>
                  <div className="flex items-center">
                  <span className="w-24 font-medium text-gray-600 dark:text-gray-300">Email:</span>
                      <span className="font-semibold flex items-center max-w-xs overflow-hidden">
                        <FiMail className="mr-2 text-blue-500 flex-shrink-0" />
                          <span className="truncate">
                            {user.email}
                            </span>
                          </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-600 dark:text-gray-300">Phone:</span>
                    <span className="font-semibold flex items-center">
                      <FiPhone className="mr-2 text-green-500" />
                      {user.number}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Additional Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center text-purple-600 dark:text-purple-400">
                  <FiUsers className="mr-2" />
                  Additional Details
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-600 dark:text-gray-300">Age:</span>
                    <span className="font-semibold flex items-center">
                      <FiCalendar className="mr-2 text-yellow-500" />
                      {user.age} years
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-600 dark:text-gray-300">Country:</span>
                    <span className="font-semibold flex items-center">
                      <FiGlobe className="mr-2 text-red-500" />
                      {user.country}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-600 dark:text-gray-300">Gender:</span>
                    <span className="font-semibold capitalize">
                      {user.gender === 'Male' ? (
                        <span className="text-blue-500">♂ {user.gender}</span>
                      ) : (
                        <span className="text-pink-500">♀ {user.gender}</span>
                      )}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Last Updated */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-6 py-4 bg-gray-100 dark:bg-gray-700 text-center text-sm text-gray-600 dark:text-gray-300"
            >
              Last updated: {new Date(user.updatedAt).toLocaleString()}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ViewCustomer;