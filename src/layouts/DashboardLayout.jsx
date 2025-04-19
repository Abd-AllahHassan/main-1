import Navbar from '../components/layoutComponents/Navbar';
import Sidebar from '../components/layoutComponents/Sidebar';
import DarkModeToggle from '../components/layoutComponents/DarkModeToggle';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {Helmet} from "react-helmet";

const DashboardLayout = ({ children }) => {
  return (
    <>
    <Helmet>
                            <title>Home</title>
                        </Helmet>
    <div className="flex min-h-screen bg-white dark:bg-dark-bg text-black dark:text-white">
      <Sidebar className="dark:bg-dark-bg" />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <motion.main
          className="p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {children}
        </motion.main>
      </div>

      <DarkModeToggle />
    </div>
    </>
  );
};

export default DashboardLayout;
