import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Ensure menu is closed when component loads
  useEffect(() => {
    setMenuOpen(false);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false); // Close menu after logout
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-[#121212] text-white px-6 py-3 flex justify-between items-center shadow-lg fixed top-0 left-0 w-full z-50"
    >
      {/* Website Name */}
      <h1 className="text-2xl font-extrabold tracking-wide text-red-500">
        Employee Management
      </h1>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden text-white"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navbar Items */}
      {user && (
        <div
          className={`absolute sm:static top-16 right-4 bg-[#121212] sm:bg-transparent p-4 sm:p-0 rounded-lg shadow-md sm:shadow-none transition-all ${
            menuOpen ? "block" : "hidden"
          } sm:flex flex-col sm:flex-row items-center gap-4`}
        >
          <span className="text-red-400 text-lg font-bold">({user.role})</span>

          {user.role === "admin" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                navigate("/admin");
                setMenuOpen(false);
              }}
              className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-4 py-2 rounded-lg shadow-md transition-all w-full sm:w-auto"
            >
              Admin Dashboard
            </motion.button>
          )}

          {user.role === "employee" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                navigate("/employee");
                setMenuOpen(false);
              }}
              className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-4 py-2 rounded-lg shadow-md transition-all w-full sm:w-auto"
            >
              Employee Dashboard
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-4 py-2 rounded-lg shadow-md transition-all w-full sm:w-auto"
          >
            Logout
          </motion.button>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
