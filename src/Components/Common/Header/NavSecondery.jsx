import React, { useState } from "react";
import "../../../CSS/nav.css";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaClipboardList, FaHome } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
// import { FullScreen, useFullScreenHandle } from "react-full-screen";

const NavSecondary = () => {
  // const handle = useFullScreenHandle();
  // const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <Navbar className="nav-seceondary">
      <Container fluid className="justify-content-left navSecondaryContainer">
        <Link className="d-flex align-items-center p-3 ps-2" to={"/"}>
          <FaHome className="nav-icon" />
          <p className="navText">Dashboard</p>
        </Link>
        <Link>
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
                <a className="dropdown-item" href="/settings">
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
        <Link className="d-flex align-items-center p-3 ps-2" to={"/all-task"}>
          <GrProjects className="big-icon" />
          <p className="navText">Task Board</p>
        </Link>
      </Container>
    </Navbar>
  );
};

export default NavSecondary;
