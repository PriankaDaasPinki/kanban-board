import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";

import "../../../../CSS/Header/ModulePage/modulePageHeader.css";
import { IoIosArrowDown } from "react-icons/io";

const ModulePageHeader = ({ ProjectImage }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);
  const dropdownWorkProcessRef = useRef(null); // To reference the dropdown area
  const dropdownTaskRef = useRef(null); // To reference the dropdown area

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleTaskDropdown = () => {
    setShowTaskDropdown(!showTaskDropdown);
  };

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownWorkProcessRef.current &&
        !dropdownWorkProcessRef.current.contains(event.target)
      ) {
        setShowDropdown(false); // Hide dropdown
      }
      if (
        dropdownTaskRef.current &&
        !dropdownTaskRef.current.contains(event.target)
      ) {
        setShowTaskDropdown(false); // Hide dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addWorkProcess = () => {
    console.log("addWorkProcess");
  };

  return (
    <Container fluid className="pageHeaderContainer">
      <div className="pageHeaderMenu ps-2 d-flex align-items-center gap-5">
        {ProjectImage ? (
          <img className="projectLogo" src={ProjectImage} alt="Project Logo" />
        ) : (
          <img
            className="projectLogo"
            src="https://w7.pngwing.com/pngs/408/212/png-transparent-project-management-body-of-knowledge-project-management-professional-project-manager-management-project-miscellaneous-text-logo-thumbnail.png"
            alt="Default Project Logo"
          />
        )}
        <p>Team Members : </p>
      </div>

      <div className="d-flex align-items-center">
        <div
          className="ms-5 me-4 ps-1 pe-1 infoButton rounded"
          onClick={toggleDropdown}
          ref={dropdownWorkProcessRef}
        >
          <div
            className="d-flex align-items-center p-2"
            onClick={toggleDropdown}
          >
            <p className="navText">Work Process</p>
          </div>
          {showDropdown && (
            <ul className="dropdown-menu show workProcess">
              <li className="d-flex flex-column justify-content-center align-items-center">
                <p
                  className="dropdown-item text-center"
                  onClick={addWorkProcess}
                >
                  +
                </p>
              </li>

              <li className="d-flex flex-column justify-content-center align-items-center">
                <a className="dropdown-item text-center" href="/Requirements">
                  <p>Requirements [1]</p>
                </a>
                <IoIosArrowDown />
              </li>

              <li className="d-flex flex-column justify-content-center align-items-center">
                <a className="dropdown-item text-center" href="/Development">
                  <p>Development [3]</p>
                </a>
                <IoIosArrowDown />
              </li>

              <li className="d-flex flex-column justify-content-center align-items-center">
                <a className="dropdown-item text-center" href="/Testing">
                  <p>Testing [2]</p>
                </a>
                <IoIosArrowDown />
              </li>

              <li className="d-flex flex-column justify-content-center align-items-center">
                <a className="dropdown-item text-center" href="/Debug">
                  <p>Debug [0]</p>
                </a>
                <IoIosArrowDown />
              </li>

              <li className="d-flex flex-column justify-content-center align-items-center">
                <a
                  className="dropdown-item text-center"
                  href="/Implement-&-Training"
                >
                  <p>Implement & Training [0]</p>
                </a>
              </li>
            </ul>
          )}
        </div>

        <div
          className="me-4 ps-1 pe-1 infoButton rounded"
          onClick={toggleTaskDropdown}
          ref={dropdownTaskRef}
        >
          <div
            className="d-flex align-items-center p-2"
            onClick={toggleTaskDropdown}
          >
            <p className="navText">Task Status</p>
          </div>
          {showTaskDropdown && (
            <ul className="dropdown-menu show">
              <li className="d-flex flex-column justify-content-center align-items-center">
                <a className="dropdown-item text-center" href="/Back-Log">
                  <p>Back Log (2)</p>
                </a>
                <IoIosArrowDown />
              </li>
              <li className="d-flex flex-column justify-content-center align-items-center">
                <a className="dropdown-item text-center" href="/To Do">
                  <p>To Do (0)</p>
                </a>
                <IoIosArrowDown />
              </li>
              <li className="d-flex flex-column justify-content-center align-items-center">
                <a className="dropdown-item text-center" href="/Paused">
                  <p>Paused (0)</p>
                </a>
                <IoIosArrowDown />
              </li>
              <li className="d-flex flex-column justify-content-center align-items-center">
                <a className="dropdown-item text-center" href="/To Do">
                  <p>To Do (0)</p>
                </a>
                <IoIosArrowDown />
              </li>
              <li className="d-flex flex-column justify-content-center align-items-center">
                <a className="dropdown-item text-center" href="/Completed">
                  <p>Completed (2)</p>
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ModulePageHeader;
