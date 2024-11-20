import React from "react";
import Project from "./Project";
import { Droppable } from "react-beautiful-dnd";
import "../../CSS/columnStyle.css";

export default function Column({ column, tasks, onEdit, onDelete }) {
  // console.log(status);

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
              <Project
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
