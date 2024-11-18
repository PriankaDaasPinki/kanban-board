import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Projects from "../Pages/Projects";
import Board from "../Components/Board";


const RoutesAll = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Projects />} />
        <Route path="/project-list" element={<Projects />} />
        <Route path="/all-task" element={<Board />} />
      </Routes>
    </Router>
  );
};

export default RoutesAll;
