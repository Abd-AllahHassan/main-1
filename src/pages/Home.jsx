import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainTable from '../components/layoutComponents/MainTable';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);
  const { token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { searchQuery } = useSearch();

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'https://crud-server-liard.vercel.app/api/customers',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
        if (err.response?.status === 401) navigate('/login');
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [token, authLoading, navigate]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `https://crud-server-liard.vercel.app/api/customers/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Link
          to="/add-customer"
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Add New User
        </Link>
      </div>

      <div className="shadow-md rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        <MainTable users={filteredUsers} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Home;
