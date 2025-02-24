import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FaExternalLinkAlt, FaList, FaRegEdit, FaUserSecret } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

import "../../CSS/taskStyle.css";

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

export default function Task({ task, index, onEdit, onDelete, columnId }) {
  console.log("task ", task);
  const [view, setView] = useState(false);
  const handleViewClose = () => setView(false);
  const handleView = () => setView(true);

  const dateFormate = (dateToFormate) => {
    const today = new Date(dateToFormate);
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const formatedDate = month + "/" + date + "/" + year;
    return formatedDate;
  };

  const start_date = dateFormate(task?.start_date);
  const end_date = dateFormate(task?.end_date);

  return (
    <>
      <Draggable draggableId={task?.id} index={index}>
        {(provided, snapshot) => (
          <Container
            className="task taskContainer"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            // onDoubleClick={() => onEdit(task.id, task.title, task.content)} // Double-click to start editing
          >
            {/* ///wedgbuibhbhj */}
            <div className="iconListBar">
              <FaList className="icons icon" onClick={handleView} />
              <div className="iconsList">
                <FaExternalLinkAlt className="icons icon" />  {/*/onClick={handleDoubleClick}*/}
                <FaRegEdit className="icons" onClick={() => onEdit(task)} />
                <RiDeleteBin5Line
                  className="icons"
                  onClick={() => onDelete(task?.id, columnId)}
                />
                {/* <GrStatusInfo className="icons" /> */}
              </div>
            </div>

            <div className="taskTitle">{task?.title}</div>
            <div className="taskDesc">{task?.content}</div>
            <div className="taskFooter flex-column align-items-start">
              <p className="dueDate">
                Start Date: {start_date ? start_date : "date not set"}
              </p>
              <p className="dueDate">
                End Date: {end_date ? end_date : "date not set"}
              </p>
              <div className="d-flex align-items-center py-1">
                <FaUserSecret />
                <p className="m-0 ps-2">{task?.assignee.name}</p>
              </div>
            </div>
          </Container>
        )}
      </Draggable>
      <Modal show={view} onHide={handleViewClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task {task?.title} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Task ID:</strong> {task?.id}
          </p>
          <p>
            <strong>Task Name:</strong> {task?.title}
          </p>
          <p>
            <strong>Task Details:</strong> {task?.content}
          </p>
          <p>
            Responsibility of <strong>{task?.assignee.name}</strong>
          </p>
          <p>
            <strong>Start Date:</strong>
            {start_date ? start_date : "date is not set"}
          </p>
          <p>
            <strong>End Date:</strong> {end_date ? end_date : "date is not set"}
          </p>
          <p>
            <strong>Task Status:</strong> {columnId}
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
