import React, { useState, useEffect } from "react";
import UserLayout from "./Layout/UserLayout";
import AdminLayout from "./Layout/AdminLayout";
import Layout from "./Layout/Layout";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for token in session storage
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("Role");
    console.log("Token from session storage:", token);

    if (token) {
      // Token exists in session storage
      setIsLoggedIn(true);

      // Check if token is admin token
      if (role === "admin") {
        // replace "your_admin_token_here" with your actual admin token
        setIsAdmin(true);
        console.log("User is an admin");
      }
    }
  }, []);

  const handleLogin = () => {
    // perform login logic, set token in session storage, and set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div>
      {console.log(isAdmin)}
      {console.log(isLoggedIn)}
      {isLoggedIn && isAdmin ? (
        <AdminLayout onLogout={handleLogout} />
      ) : isLoggedIn && !isAdmin ? (
        <UserLayout onLogout={handleLogout} />
      ) : (
        <Layout onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
