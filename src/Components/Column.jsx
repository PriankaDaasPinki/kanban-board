import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import "../CSS/columnStyle.css";

// export default function Column({ title, tasks, id }) {
//   return (
//     <Container className="columnStyle">
//       <h2 className="column_title">{title}</h2>

//       <Droppable droppableId={id}>
//         {(provided, snapshot) => {
//           <div
//             className="taskList"
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             isDraggingOver={snapshot.isDraggingOver}
//           >
//             <h2>I am a droppable!</h2>
//             {provided.placeholder}
//           </div>;
//         }}

//         <Task task={{id:123, title:"create first task"}} index={1} />
//       </Droppable>
//     </Container>
//   );
// }

export default function Column({ column, tasks, onEdit, onDelete }) {
  return (
    <div className="column">
      <div className="column_title">{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                columnId={column.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
