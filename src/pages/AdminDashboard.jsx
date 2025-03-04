import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    setEmployees(users.filter((u) => u.role === "employee"));
  }, []);

  const assignTask = () => {
    if (!task || !selectedEmployee || !dueDate) return;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) => {
      if (u.email === selectedEmployee) {
        u.tasks = u.tasks
          ? [...u.tasks, { title: task, completed: false, dueDate, priority }]
          : [{ title: task, completed: false, dueDate, priority }];
      }
      return u;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setTask("");
    setDueDate("");
    setPriority("Low");
    alert("Task assigned successfully!");
  };

  const deleteEmployee = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter((u) => u.email !== email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEmployees(updatedUsers.filter((u) => u.role === "employee"));
    alert("Employee deleted successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-4xl mx-auto bg-black text-white shadow-lg rounded-2xl mt-25"
    >
      <h1 className="text-3xl font-extrabold text-center mb-6 text-red-500">
        Welcome, {user?.name} <span className="text-gray-300">(Admin)</span>
      </h1>

      {/* Register New Employee */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/admin/register")}
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-xl shadow-md"
        >
          Register New Employee
        </motion.button>
      </div>

      {/* Assign Tasks */}
      <div className="mt-8 p-5 bg-gray-900 shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Assign Tasks</h2>
        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-3 w-full mb-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-red-500"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-3 w-full mb-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-red-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-3 w-full mb-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-red-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="border p-3 w-full mb-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-red-500"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.email} value={emp.email}>
              {emp.name}
            </option>
          ))}
        </select>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={assignTask}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl w-full shadow-md"
        >
          Assign Task
        </motion.button>
      </div>

      {/* Employee Management */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Employee Management</h2>
        {employees.length > 0 ? (
          employees.map((emp) => (
            <motion.div
              key={emp.email}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="border p-5 mt-4 flex justify-between items-center bg-gray-900 rounded-xl shadow-md"
            >
              <div>
                <h3 className="font-bold text-lg text-white">{emp.name}</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteEmployee(emp.email)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md"
              >
                Delete
              </motion.button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400">No employees registered</p>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;