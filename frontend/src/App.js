import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
<<<<<<< HEAD
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
=======
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
<<<<<<< HEAD
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<PasswordReset />} />
=======
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
      </Routes>
    </Router>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
