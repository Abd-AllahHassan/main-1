import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, UserPlus, Menu, X } from 'lucide-react';
import UserMenu from './UserMenu';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  // Animation for mobile sidebar
  const mobileSidebarVariants = {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: {
      x: '-100%',
      transition: { duration: 0.3 },
    },
  };

  // Animation for desktop sidebar on initial load
  const desktopSidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  return (
    <div>
      {/* Hamburger button for small screens */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-4 z-50 relative text-dark-bg dark:text-white"
        >
          <Menu size={28} />
        </button>
      )}

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50"
              onClick={toggleSidebar}
            ></div>

            {/* Animated Sidebar */}
            <motion.aside
              className="relative z-50 bg-dark-sidebar text-light-text w-64 min-h-screen flex flex-col"
              variants={mobileSidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-end p-4">
                <button onClick={toggleSidebar} className="text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow px-6">
                <nav className="flex flex-col gap-4">
                  <NavLink
                    to="/home"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 p-2 rounded hover:bg-card-blue hover:text-white transition-colors"
                  >
                    <Home size={20} />
                    <span>Home</span>
                  </NavLink>
                  <NavLink
                    to="/add-customer"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 p-2 rounded hover:bg-card-blue hover:text-white transition-colors"
                  >
                    <UserPlus size={20} />
                    <span>Add Customer</span>
                  </NavLink>
                </nav>
              </div>

              <div className="p-6">
                <UserMenu />
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Animated Desktop Sidebar on load */}
      <motion.aside
        className="hidden lg:flex flex-col justify-between bg-dark-sidebar text-light-text w-64 min-h-screen"
        variants={desktopSidebarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex-grow p-6">
          <nav className="flex flex-col gap-4">
            <NavLink
              to="/home"
              className="flex items-center gap-3 p-2 rounded hover:bg-card-blue hover:text-white transition-colors"
            >
              <Home size={20} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/add-customer"
              className="flex items-center gap-3 p-2 rounded hover:bg-card-blue hover:text-white transition-colors"
            >
              <UserPlus size={20} />
              <span>Add Customer</span>
            </NavLink>
          </nav>
        </div>

        <div className="p-6">
          <UserMenu />
        </div>
      </motion.aside>
    </div>
  );
};

export default Sidebar;
