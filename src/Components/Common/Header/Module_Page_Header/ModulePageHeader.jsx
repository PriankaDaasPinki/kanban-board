import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";

import "../../../../CSS/Header/ModulePage/modulePageHeader.css";
import { IoIosArrowDown } from "react-icons/io";
import AddWorkProcess from "./modal_for_header/AddWorkProcess";
import { FaEdit, FaPlus } from "react-icons/fa";

const ModulePageHeader = ({ ProjectImage }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);
  const [workProcesses, setWorkProcesses] = useState([
    { id: 1, processName: "Requirements", position: 1, count: 1 },
    { id: 2, processName: "Development", position: 2, count: 3 },
    { id: 3, processName: "Testing", position: 3, count: 2 },
    { id: 4, processName: "Debug", position: 4, count: 0 },
    { id: 5, processName: "Implement & Training", position: 5, count: 0 },
  ]);

  const taskStatuses = [
    { id: 1, name: "Back Log", count: 2 },
    { id: 2, name: "To Do", count: 0 },
    { id: 3, name: "In Progress", count: 1 },
    { id: 4, name: "Paused", count: 0 },
    { id: 5, name: "Completed", count: 2 },
  ];
  const [showModal, setShowModal] = useState(false);
  const [newWorkProcess, setNewWorkProcess] = useState("");

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

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewWorkProcess(""); // Clear input
  };

  const handleAddWorkProcess = () => {
    if (newWorkProcess.trim()) {
      setWorkProcesses([
        ...workProcesses,
        { id: workProcesses.length + 1, processName: newWorkProcess, count: 0 },
      ]);
      closeModal();
    }
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
              <li className="dropdown-item d-flex flex-column justify-content-center align-items-center addWorkProcessButton">
                <p className="text-center" onClick={openModal}>
                  <FaPlus /> / <FaEdit />
                </p>
              </li>

              {workProcesses.map((process) => (
                <li
                  key={process.id}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <a
                    className="dropdown-item text-center"
                    href={`/${process.processName.replace(" ", "-")}`}
                  >
                    <p>
                      {process.processName} [{process.count}]
                    </p>
                  </a>
                  {workProcesses.length !== process.id && <IoIosArrowDown />}
                </li>
              ))}
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
              {taskStatuses.map((taskStatus) => (
                <li
                  key={taskStatus.id}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <a
                    className="dropdown-item text-center"
                    href={`/${taskStatus.name.replace(" ", "-")}`}
                  >
                    <p>
                      {taskStatus.name} [{taskStatus.count}]
                    </p>
                  </a>
                  {taskStatuses.length !== taskStatus.id && <IoIosArrowDown />}
                </li>
              ))}
              {/* <li className="d-flex flex-column justify-content-center align-items-center">
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
              </li> */}
            </ul>
          )}
        </div>
      </div>

      <AddWorkProcess
        show={showModal}
        handleClose={closeModal}
        handleAddWorkProcess={handleAddWorkProcess}
        workProcesses={workProcesses}
        inputValue={newWorkProcess}
        setInputValue={setNewWorkProcess}
      />
    </Container>
  );
};

export default ModulePageHeader;
