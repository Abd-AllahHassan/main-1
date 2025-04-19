import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MainTable from '../components/layoutComponents/MainTable';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext'; // Import the useSearch hook

const Home = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);
  const { token, loading: authLoading, error: authError } = useAuth();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch(); // Use the search query from context

  // Fetch users on mount and when the search query or token changes
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
        console.error('Error fetching users:', err);
        if (err.response?.status === 401) {
          logout();
        }
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [token, authLoading, navigate]);

  // Filter users based on the search query
  useEffect(() => {
    const filtered = users.filter((user) =>
      user.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())    );
    setFilteredUsers(filtered); // Set filtered users based on query
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
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Link
          to="/user/add"
          className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add New User
        </Link>
      </div>

      <div className="shadow-md rounded-lg overflow-hidden">
        <MainTable 
          users={filteredUsers} // Pass filtered users to the table
          onDelete={handleDelete} 
        />
      </div>
    </div>
  );
};

export default Home;
