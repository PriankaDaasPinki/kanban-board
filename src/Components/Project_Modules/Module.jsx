import React from "react";
import styled from "styled-components";
import { FaList, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../CSS/moduleStyle.css";

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

function Module({ id, index, moduleTitle, completed, onEdit, onDelete }) {
  // console.log("columnId " +columnId);
  const [view, setView] = useState(false);
  const handleViewClose = () => setView(false);
  const handleView = () => setView(true);
  const nevigate = useNavigate();

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = month + "/" + date + "/" + year;

  return (
    <>
      <Container
        className="module moduleContainer"
        onDoubleClick={() => nevigate("/module-module")} // Double-click to start editing
      >
        <div className="iconListBar">
          <FaList className="icons icon" onClick={handleView} />
          <div className="iconsList">
            <FaRegEdit
              className="icons"
              onClick={() => onEdit(id, moduleTitle, completed)}
            />
            {/* <GrView className="icons" onClick={handleView} /> */}
            <RiDeleteBin5Line className="icons" onClick={() => onDelete(id)} />
          </div>
        </div>

        <div className="p-2">
          <div className="moduleTitle">{moduleTitle}</div>
          <div className="moduleModule">Number of Module: {index}</div>
        </div>
      </Container>
      <Modal show={view} onHide={handleViewClose}>
        <Modal.Header closeButton>
          <Modal.Title>Module {moduleTitle} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Module ID:</strong> {id}
          </p>
          <p>
            <strong>Module Name:</strong> {moduleTitle}
          </p>
          <p>
            <strong>Module Requirements:</strong> {completed}
          </p>
          <p>
            Module under supervision of <strong>assignee</strong>
          </p>
          <p>
            <strong>Due Date:</strong> {currentDate}
          </p>
          <p>
            <strong>Module Status:</strong> {completed}
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

export default React.memo(Module);