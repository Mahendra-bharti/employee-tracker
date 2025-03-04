import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirects to Login page
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-[#121212] text-white px-6 py-3 flex justify-between items-center shadow-lg fixed top-0 left-0 w-full z-50"
    >
      <h1 className="text-2xl font-extrabold tracking-wide text-red-500">
        Employee Management
      </h1>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-red-400 text-lg font-bold">
            ({user.role})
          </span>

          {user.role === "admin" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/admin")}
              className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-4 py-2 rounded-lg shadow-md transition-all"
            >
              Admin Dashboard
            </motion.button>
          )}

          {user.role === "employee" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/employee")}
              className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-4 py-2 rounded-lg shadow-md transition-all"
            >
              Employee Dashboard
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-4 py-2 rounded-lg shadow-md transition-all"
          >
            Logout
          </motion.button>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
