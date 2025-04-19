import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import defaultAvatar from '../assets/avatar.webp';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const avatar = defaultAvatar;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="profile-container bg-white dark:bg-dark-bg p-6 rounded-lg shadow-md transition-colors duration-200"
      >
        {/* Profile Header */}
        <div className="profile-header mb-6">
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-300">Profile</h1>
        </div>

        {/* Profile Details */}
        <div className="profile-details flex items-center gap-6 mb-6">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600 transition-colors duration-200"
          />
          <div className="profile-info">
            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              {user.username || 'Guest'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email || 'Not Available'}
            </p>
          </div>
        </div>

        {/* Profile Actions */}
        <div className="profile-actions mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors duration-200">
            Edit Profile
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default ProfilePage;
