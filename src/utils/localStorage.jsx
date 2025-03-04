export const initializeDefaultAdmin = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  // Check if an admin user already exists
  const adminExists = users.some(user => user.role === "admin");
  
  if (!adminExists) {
    const defaultAdmin = {
      name: " Admin",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin"
    };
    users.push(defaultAdmin);
    localStorage.setItem("users", JSON.stringify(users));
  }
};

export const initializeDefaultEmployee = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  // Check if at least one employee exists
  const employeeExists = users.some(user => user.role === "employee");
  
  if (!employeeExists) {
    const defaultEmployee = {
      name: "Default Employee",
      email: "employee@gmail.com",
      password: "employee123",
      role: "employee",
      tasks: []  // Initialize with no tasks
    };
    users.push(defaultEmployee);
    localStorage.setItem("users", JSON.stringify(users));
  }
};
