import React from "react";
import styled from "styled-components";
import { FaExternalLinkAlt, FaList, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../CSS/projectStyle.css";
// import useCallAPI from "../../HOOKS/useCallAPI";

const Container = styled.div`
  background-color: ${(props) => bgcolorChange(props)};
`;

function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#fffada";
}

function Project({
  id,
  projectTitle,
  completed,
  onEdit,
  onDelete,
  moduleNumber,
}) {
  console.log("moduleNumber " + moduleNumber);
  const [view, setView] = useState(false);
  const handleViewClose = () => setView(false);
  const handleView = () => setView(true);
  const nevigate = useNavigate();
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = month + "/" + date + "/" + year;

  const handleDoubleClick = () => {
    // onGetPageTitle(projectTitle);
    nevigate("/project-module/" + projectTitle, {
      state: { id, module },
    });
  };

  return (
    <>
      <Container
        className="project projectContainer"
        onDoubleClick={handleDoubleClick} // Double-click to start editing
      >
        <div className="iconListBar">
          <FaList className="icons icon" onClick={handleView} />

          <div className="iconsList">
            <FaExternalLinkAlt className="icons icon" onClick={handleDoubleClick} />
            <FaRegEdit
              className="icons"
              onClick={() => onEdit(id, projectTitle, completed)}
            />
            {/* <GrView className="icons" onClick={handleView} /> */}
            <RiDeleteBin5Line className="icons" onClick={() => onDelete(id)} />
          </div>
        </div>

        <div className="p-2">
          <div className="projectTitle">{projectTitle}</div>
          <div className="projectModule">Number of Module: {moduleNumber}</div>
        </div>
      </Container>
      <Modal show={view} onHide={handleViewClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project {projectTitle} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Project ID:</strong> {id}
          </p>
          <p>
            <strong>Project Name:</strong> {projectTitle}
          </p>
          <p>
            <strong>Project Requirements:</strong> {completed}
          </p>
          <p>
            Project under supervision of <strong>assignee</strong>
          </p>
          <p>
            <strong>Due Date:</strong> {currentDate}
          </p>
          <p>
            <strong>Project Status:</strong> {completed}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Project;
