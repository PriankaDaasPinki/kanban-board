import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FaList, FaRegEdit, FaUserSecret } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button, Modal } from "react-bootstrap";
// import { GrStatusInfo, GrView } from "react-icons/gr";
import { useEffect, useState } from "react";
import axios from "axios";

import "../../CSS/taskStyle.css";
import { API_URL } from "../Authentication/api";

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
  const [assignee, setAssignee] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const assignee_url = `/tasks/assignee/`;

  const fetchAssignee = async () => {
    setLoading(true);
    setError(null);
    try {
      const assigneeFetchData = await axios.get(
        API_URL + assignee_url + task?.assignee
      );
      setAssignee(assigneeFetchData.data.assignee[0]);
      return assigneeFetchData;
    } catch (err) {
      setError("Failed to fetch assignee.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignee(); // Fetch data when the component mounts
    // eslint-disable-next-line
  }, []);

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
                <FaRegEdit
                  className="icons"
                  onClick={() =>
                    onEdit(task)
                  }
                />
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
                <p className="m-0 p-1">
                  {loading? "loading..." : error? error : assignee.first_name + " " + assignee.last_name}
                </p>
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
            Responsibility of{" "}
            <strong>{assignee.first_name + " " + assignee.last_name}</strong>
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
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
          {/* <Button type="submit" variant="danger" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
