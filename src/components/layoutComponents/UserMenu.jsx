import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';
import defaultAvatar from '../../assets/avatar.webp';

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const { logout } = useAuth();
  const avatar = defaultAvatar;

  const [userData, setUserData] = useState({
    username: 'Guest',
    email: 'Not Available',
  });

  const toggleMenu = () => setOpen((prev) => !prev);

  // Sync user data from localStorage
  const syncUserData = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUserData({
      username: storedUser?.username || 'Guest',
      email: storedUser?.email || 'Not Available',
    });
  };

  // UseEffect to sync user data on initial load
  useEffect(() => {
    syncUserData();

    // Optional: Detect clicks outside the menu to close it
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Detect changes in localStorage (across tabs/windows)
  useEffect(() => {
    const onStorageChange = () => {
      syncUserData(); // Update userData whenever there's a change in localStorage
    };

    window.addEventListener('storage', onStorageChange);

    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, []);

  // Handle logout functionality
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
            <p className="text-sm font-medium">{userData.username}</p>
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
