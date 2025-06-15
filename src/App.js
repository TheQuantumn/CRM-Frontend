import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';

import Home from "./pages/Home";
import JobListPage from "./pages/JobListPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import NavBar from "./NavBar"; 

const AppContent = () => {
  const location = useLocation();
  const hideNavbarOn = ["/", "/login", "/signup"];
  const shouldShowNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/signup" element={<Home />} />
        <Route path="/jobs" element={<JobListPage />} />
        <Route path="/my-applications" element={<MyApplicationsPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
