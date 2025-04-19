import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import defaultAvatar from '../../assets/avatar.webp';

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);  // Store user data from API
  const menuRef = useRef();
  const { logout, token } = useAuth();

  const avatar = user?.avatar || defaultAvatar;  // Use user avatar or default avatar
  const username = user?.username || 'Guest';

  const toggleMenu = () => setOpen((prev) => !prev);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('https://crud-server-liard.vercel.app/api/profile', {
          headers: { Authorization: `Bearer ${token}` },  // Use the token for authentication
        });
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        toast.error('Failed to fetch user profile');
      }
    };

    if (token) {
      fetchUserProfile();  // Fetch user data when the token is available
    }
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    toast.success('You have been logged out!');
  };

  return (
    <div ref={menuRef} className="relative w-full max-w-xs">
      <div
        className="flex items-center justify-between bg-dark-card p-3 rounded cursor-pointer hover:bg-dark-bg transition"
        onClick={toggleMenu}
      >
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium">{username}</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
        {open ? <ChevronUp /> : <ChevronDown />}
      </div>

      {open && (
        <div className="absolute bottom-16 right-0 w-full bg-dark-card border border-dark-bg rounded shadow-md z-50">
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 hover:bg-card-blue hover:text-white text-sm"
            onClick={() => setOpen(false)}
          >
            <User size={16} />
            Profile
          </Link>
          <button
            className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-card-blue hover:text-white text-sm"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
