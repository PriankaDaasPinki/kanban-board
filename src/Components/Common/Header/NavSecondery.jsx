import React, { useEffect, useRef, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaClipboardList, FaHome } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
// import { FullScreen, useFullScreenHandle } from "react-full-screen";

import "../../../CSS/Header/nav.css";

const NavSecondary = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // To reference the dropdown area

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Hide dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar className="nav-seceondary">
      <Container fluid className="justify-content-left navSecondaryContainer">
        <Link className="d-flex align-items-center p-3 ps-2" to={"/"}>
          <FaHome className="nav-icon" />
          <p className="navText">Dashboard</p>
        </Link> 
        <Link to={toggleDropdown} ref={dropdownRef}>
          <div
            className="d-flex align-items-center p-2"
            onClick={toggleDropdown}
          >
            <MdAdminPanelSettings className="nav-icon" />
            <p className="navText">Administration</p>
          </div>
          {showDropdown && (
            <ul className="dropdown-menu show">
              <li>
                <a className="dropdown-item" href="/user-management">
                  User Management
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/role-management">
                  Role Management
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Settings
                </a>
              </li>
            </ul>
          )}
        </Link>
        <Link className="d-flex align-items-center p-2" to={"/all-task"}>
          <FaClipboardList className="big-icon" />
          <p className="navText">Task Board</p>
        </Link>
        <Link className="d-flex align-items-center p-3 ps-2" to={"/"}>
          <GrProjects className="big-icon" />
          <p className="navText">Project Name</p>
        </Link>
      </Container>
    </Navbar>
  );
};

export default NavSecondary;
