import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Income from "./pages/Dashboard/Income";
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/Expense";

const Root = () => {
  const isAuth = !!localStorage.getItem("token");
  return <Navigate to={isAuth ? "/dashboard" : "/login"} replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/income" element={<Income />} />
      <Route path="/expense" element={<Expense />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;