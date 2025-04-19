import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import defaultAvatar from '../assets/avatar.webp';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState({ username: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const avatar = defaultAvatar;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('https://crud-server-liard.vercel.app/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        setEditableUser({
          username: res.data.username || '',
          email: res.data.email || '',
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }

    // Listen to localStorage changes to update user data if modified elsewhere
    const onStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      if (updatedUser) {
        setUser(updatedUser);
        setEditableUser({
          username: updatedUser.username || '',
          email: updatedUser.email || '',
        });
      }
    };

    window.addEventListener('storage', onStorageChange);

    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        'https://crud-server-liard.vercel.app/api/profile',
        editableUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data)); // Update localStorage immediately
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Failed to update profile');
    }
  };

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
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
        {/* Header */}
        <div className="profile-header mb-6">
          <h1 className="text-3xl font-bold text-gray-700 dark:text-gray-300">Profile</h1>
        </div>

        {/* Avatar & Info */}
        <div className="profile-details flex items-center gap-6 mb-6">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
          />
          <div className="profile-info space-y-2">
            {editing ? (
              <>
                <input
                  type="text"
                  name="username"
                  value={editableUser.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <input
                  type="email"
                  name="email"
                  value={editableUser.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded text-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </>
            ) : (
              <>
                <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  {user.username}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="profile-actions mt-6 flex gap-4">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setEditableUser({ username: user.username, email: user.email });
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ProfilePage;