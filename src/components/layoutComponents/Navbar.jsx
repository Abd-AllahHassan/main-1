import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useSearch } from '../../context/SearchContext'; // Import useSearch hook

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useSearch(); // Context-based search
  const [inputValue, setInputValue] = useState(''); // Local input state
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://crud-server-liard.vercel.app/api/customers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users only when searchQuery (from context) changes
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setFiltered([]);
      return;
    }

    const firstLetter = searchQuery.charAt(0).toLowerCase();
    const results = users.filter((user) =>
      user.firstName.toLowerCase().startsWith(firstLetter)
    );
    setFiltered(results);
  }, [searchQuery, users]);

  const handleSearch = () => {
    setSearchQuery(inputValue.trim()); // Only set when button clicked
  };

  return (
    <motion.div
      className="bg-gray-200 dark:bg-dark-bg text-dark-text dark:text-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1 className="text-3xl font-bold">Main Dashboard</h1>

      {/* Search Area */}
      <div className="relative w-full sm:w-auto mt-4 sm:mt-0">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-white dark:bg-gray-800 text-black dark:text-white text-sm px-4 py-2 rounded-md outline-none w-full sm:w-52"
          />
          <button
            onClick={handleSearch}
            className="bg-transparent border-2 border-green-500 text-green-500 text-sm px-4 py-2 rounded-md hover:bg-green-500 hover:text-white transition hidden sm:block"
          >
            Search
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
