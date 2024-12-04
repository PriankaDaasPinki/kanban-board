// import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FaRegEdit, FaUserSecret } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrStatusInfo, GrView } from "react-icons/gr";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../CSS/projectStyle.css";

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

export default function Project({
  id,
  index,
  projectTitle,
  completed,
  onEdit,
  onDelete,
}) {
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
        className="project projectContainer p-4"
        onDoubleClick={() => (nevigate("/project-module"))} // Double-click to start editing
      >
        <div className="editDeletionIcon">
          <FaRegEdit
            className="editIcon"
            onClick={() => onEdit(id, projectTitle, completed)}
          />
          <GrView className="editIcon" onClick={handleView} />
        </div>

        <div className="p-2">
          <div className="taskTitle">{projectTitle}</div>
          <div className="taskDesc">
            {completed} {index}
          </div>
        </div>
        <div className="taskFooter align-items-start">
          <p className="dueDate">Date: {currentDate}</p>
          <RiDeleteBin5Line
            className="deleteIcon text-red"
            onClick={() => onDelete(id)}
          />
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
          {/* <Button type="submit" variant="danger" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
