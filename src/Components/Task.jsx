// import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import "../CSS/taskStyle.css";
import styled from "styled-components";
import { FaRegEdit, FaUserSecret } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
// import { useState } from "react";
// import { Modal } from "react-bootstrap";
// import { Button } from "react-bootstrap";

// import handleEditShow from "./Board"

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

export default function Task({
  task,
  index,
  onEdit,
  onDelete,
  columnId,
  // onChangeAssignee,
}) {
  // const [showEdit, setShowEdit] = useState(false);
  // const handleEditClose = () => setShowEdit(false);
  // const handleEditShow = () => setShowEdit(true);
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          className="task taskContainer"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          // onDoubleClick={() => onEdit(task.id, task.title, task.content)} // Double-click to start editing
        >
          <div className="editDeletionIcon">
            <RiDeleteBin5Line
              className="deleteIcon"
              onClick={() => onDelete(task.id, columnId)}
            />
            <FaRegEdit
              className="editIcon"
              onClick={() => onEdit(task.id, task.title, task.content)}
            />
          </div>

          <div className="taskTitle">{task.title}</div>
          <div className="taskDesc">{task.content}</div>
          <div className="taskFooter">
            <p className="dueDate">Date:</p>
            <div className="assigneeIcon">
              <FaUserSecret />
            </div>
          </div>
        </Container>
      )}
    </Draggable>
  );
}

// export default function Task(task, index) {
//   return (
//     <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
//       {(provided, snapshot) => (
//         <Container
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//           isDragging={snapshot.isDragging}
//         >
//           <div>
//             <span>
//               <small>#{task.id} </small>
//             </span>
//           </div>

//           <div>
//             <p>{task.title}</p>
//           </div>

//           <div>
//           <FaUserSecret />
//           </div>
//           {provided.placeholder}
//         </Container>
//       )}
//     </Draggable>
//   );
// }
