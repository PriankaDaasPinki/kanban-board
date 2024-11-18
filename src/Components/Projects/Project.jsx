import { Draggable } from "react-beautiful-dnd";
import "../../CSS/taskStyle.css";
import styled from "styled-components";
import { FaRegEdit, FaUserSecret } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

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
  return (
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
            <RiDeleteBin5Line
              className="deleteIcon"
              onClick={() => onDelete(task.id, columnId)}
            />
            <FaRegEdit
              className="editIcon"
              onClick={() =>
                onEdit(task.id, task.title, task.content, task.assignee)
              }
            />
          </div>

          <div className="taskTitle">{task.title}</div>
          <div className="taskDesc">{task.content}</div>
          <div className="taskFooter">
            <p className="dueDate">Date: {task.date}</p>
            <div className="assigneeIcon">
              <FaUserSecret /> {task.assignee}
            </div>
          </div>
        </Container>
      )}
    </Draggable>
  );
}
