// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./authentication";
import Quest from "./Quest";
import Pushup from "./pushup";
// import './index.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/quest" element={<Quest />} />
        <Route path="/pushup" element={<Pushup />} />
      </Routes>
    </Router>
  );
}

export default App;



