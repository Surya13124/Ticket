import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputTicket from "./Components/InputTicket";
import LoginSignup from "./Components/LoginSignup";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/viewtickets" element={<InputTicket />} />
      </Routes>
    </Router>
  );
}

export default App;
