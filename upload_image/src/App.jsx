import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
    <BrowserRouter>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
