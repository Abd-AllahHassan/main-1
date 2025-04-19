import { useEffect, useState } from 'react';
import { MdWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setDarkMode(systemPreference === "dark");
      document.documentElement.setAttribute("data-theme", systemPreference);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode ? "dark" : "light";
    setDarkMode(!darkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.button
        onClick={toggleTheme}
        whileTap={{ scale: 0.9, rotate: 15 }}
        className="bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={darkMode ? "sun" : "moon"}
            initial={{ opacity: 0, rotate: 180, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -180, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            {darkMode ? (
              <MdWbSunny className="text-xl" />
            ) : (
              <IoMdMoon className="text-xl" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default DarkModeToggle;
