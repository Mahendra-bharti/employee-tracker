import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = users.find((u) => u.email === user.email);
    setTasks(loggedInUser?.tasks || []);
  }, []);

  const completeTask = (index) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) => {
      if (u.email === user.email) {
        u.tasks[index].completed = true;
      }
      return u;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setTasks(updatedUsers.find((u) => u.email === user.email).tasks);
  };

  const resignJob = () => {
    if (!window.confirm("Are you sure you want to resign?")) return;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.filter((u) => u.email !== user.email);
    localStorage.setItem("users", JSON.stringify(users));
    alert("You have resigned from your job.");
    logout();
    navigate("/");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-3xl mx-auto bg-[#121212] text-white shadow-lg rounded-2xl mt-25"
    >
      <h1 className="text-3xl font-extrabold text-center text-red-500 mb-6 mt-6">
        Welcome, {user?.name} <span className="text-gray-400">(Employee)</span>
      </h1>

      {/* Task Filter Dropdown */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Your Tasks</h2>
        <select
          className="border border-gray-600 p-2 rounded-xl bg-[#1E1E1E] text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex justify-between items-center bg-[#1E1E1E] p-4 rounded-xl shadow-md border-l-4 border-red-500"
            >
              <span
                className={`text-lg font-medium ${
                  task.completed ? "text-green-400" : "text-red-400"
                }`}
              >
                {task.title} - {task.completed ? "Completed" : "Pending"}
              </span>
              {!task.completed && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => completeTask(index)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-md transition-all"
                >
                  Complete
                </motion.button>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400">No tasks assigned</p>
        )}
      </div>

      {/* Resign Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resignJob}
        className="mt-6 bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-4 py-3 rounded-xl w-full shadow-lg transition-all"
      >
        Resign from Job
      </motion.button>
    </motion.div>
  );
};

export default EmployeeDashboard;
