import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Projects from "../Pages/Projects";
import Board from "../Components/Tasks/Board";
import Modules from "../Pages/Modules";
import Error from "../Pages/Error";
import Navbar from "../Components/Common/Header/Nav";
import NavSecondary from "../Components/Common/Header/NavSecondery";
// import PageHeaderNav from "../Components/Common/Header/PageHeaderNav";

const RoutesAll = () => {
  return (
    <Router>
      <div className="mb-1">
        <Navbar />
        <NavSecondary />
      </div>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Projects />} />
        <Route path="/project-list" element={<Projects />} />
        <Route path="/project-module" element={<Modules />} />
        <Route path="/all-task" element={<Board />} />
      </Routes>
    </Router>
  );
};

export default RoutesAll;
