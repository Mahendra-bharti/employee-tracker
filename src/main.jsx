import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeDefaultAdmin, initializeDefaultEmployee } from "./utils/localStorage";

// Initialize default admin and employee if not present
initializeDefaultAdmin();
initializeDefaultEmployee();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
