import { Draggable } from "react-beautiful-dnd";
import "../../CSS/taskStyle.css";
import styled from "styled-components";
import { FaRegEdit, FaUserSecret } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrStatusInfo, GrView } from "react-icons/gr";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

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

export default function Project({ task, index, onEdit, onDelete, columnId }) {
  // console.log("columnId " +columnId);
  const [view, setView] = useState(false);
  const handleViewClose = () => setView(false);
  const handleView = () => setView(true);

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = month + "/" + date + "/" + year;

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <Container
            className="task taskContainer"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            onDoubleClick={() => (window.location.href = "/all-task")} // Double-click to start editing
          >
            <div className="editDeletionIcon">
              <FaRegEdit
                className="editIcon"
                onClick={() =>
                  onEdit(task.id, task.title, task.content, task.assignee)
                }
              />
              <GrView className="editIcon" onClick={handleView} />
            </div>

            <div className="taskTitle">{task.title}</div>
            <div className="taskDesc">{task.content}</div>
            <div className="taskFooter flex-column align-items-start">
              <p className="dueDate">
                Date: {task.date ? task.date : currentDate}
              </p>
              <div className="assigneeIcon">
                <FaUserSecret /> {task.assignee}
              </div>
            </div>
            <div className="mt-3 editDeletionIcon">
              <RiDeleteBin5Line
                className="deleteIcon text-red"
                onClick={() => onDelete(task.id, columnId)}
              />
              <div className="d-flex align-items-center">
                <GrStatusInfo /> <p className="m-0 ps-2">{columnId}</p>
              </div>
            </div>
          </Container>
        )}
      </Draggable>
      <Modal show={view} onHide={handleViewClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project {task.title} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Project ID:</strong> {task.id}
          </p>
          <p>
            <strong>Project Name:</strong> {task.title}
          </p>
          <p>
            <strong>Project Requirements:</strong> {task.content}
          </p>
          <p>
            Project under supervision of <strong>{task.assignee}</strong>
          </p>
          <p>
            <strong>Due Date:</strong> {task.date ? task.date : currentDate}
          </p>
          <p>
            <strong>Project Status:</strong> {columnId}
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
