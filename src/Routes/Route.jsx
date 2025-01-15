import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Projects from "../Pages/Projects";
import Board from "../Components/Tasks/Board";
import Modules from "../Pages/Modules";
import Error from "../Pages/Error";
import Navbar from "../Components/Common/Header/Nav";
import NavSecondary from "../Components/Common/Header/NavSecondery";
// import UserRegister from "../Pages/Registration_and_Login/UserRegister";
import Login from "../Pages/Registration_and_Login/Login";
import Protected from "./Protected";
import User from "../Pages/User";
// import PageHeaderNav from "../Components/Common/Header/PageHeaderNav";

const RoutesAll = () => {
  return (
    <Router>
      <Navbar />
      <NavSecondary />

      <Routes>
        {/* <Route path="/registration" element={<UserRegister />} /> */}
        <Route path="/" element={<Protected page={<Projects />} />} />
        <Route path="*" element={<Protected page={<Error />} />} />
        <Route path="/home" element={<Protected page={<Projects />} />} />
        <Route path="/user" element={<Protected page={<User />} />} />
        <Route path="/user/:username" element={<Protected page={<User />} />} />
        <Route
          path="/project-list"
          element={<Protected page={<Projects />} />}
        />
        <Route
          path="/project/:name"
          element={<Protected page={<Projects />} />}
        />
        <Route
          path="/project-module"
          element={<Protected page={<Modules />} />}
        />
        <Route
          path="/project-module/:name"
          element={<Protected page={<Modules />} />}
        />
        <Route path="/all-task" element={<Board />} />
        <Route
          path="/all-task/:name"
          element={<Protected page={<Board />} />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default RoutesAll;
