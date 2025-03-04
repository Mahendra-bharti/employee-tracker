import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = login(email, password);
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "employee") {
      navigate("/employee");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#1E1E1E] p-8 rounded-2xl shadow-lg max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            type="email"
            placeholder="Email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-700 bg-[#2A2A2A] p-3 w-full rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:outline-none transition"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-700 bg-[#2A2A2A] p-3 w-full rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:outline-none transition"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          />
          <motion.button
            type="submit"
            className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-semibold py-3 rounded-lg w-full shadow-lg transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
