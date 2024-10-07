import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "../CSS/taskStyle.css";
import styled from "styled-components";
import { FaUserSecret } from "react-icons/fa";

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

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          className="task taskContainer"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className="taskTitle">{task.title}</div>
          <div className="taskDesc">{task.content}</div>
          <div className="taskFooter">
            <p className="dueDate">Date:</p>
            <div className="iconStyle">
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
