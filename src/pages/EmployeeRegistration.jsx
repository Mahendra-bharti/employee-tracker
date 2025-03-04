import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EmployeeRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistration = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === email)) {
      alert("A user with this email already exists.");
      return;
    }

    const newEmployee = {
      name,
      email,
      password,
      role: "employee",
      tasks: [],
    };

    users.push(newEmployee);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Employee registered successfully!");
    navigate("/admin");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-md mx-auto bg-[#121212] text-white shadow-lg rounded-2xl mt-25"
    >
      <h1 className="text-2xl font-extrabold text-center text-red-500 mb-6">
        Register New Employee
      </h1>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-600 p-3 w-full mb-3 rounded-lg bg-[#1E1E1E] text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-600 p-3 w-full mb-3 rounded-lg bg-[#1E1E1E] text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
      />

      <input
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-600 p-3 w-full mb-3 rounded-lg bg-[#1E1E1E] text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleRegistration}
        className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-4 py-2 rounded-xl w-full shadow-md transition-all"
      >
        Register Employee
      </motion.button>

      <p
        onClick={() => navigate("/admin")}
        className="text-red-400 text-center mt-4 cursor-pointer hover:underline"
      >
        Back to Admin Dashboard
      </p>
    </motion.div>
  );
};

export default EmployeeRegistration;
