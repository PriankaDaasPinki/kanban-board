import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./App.css";

const App = () => {
  const [data, setData] = useState({
    tasks: {},
    columns: {
      "column-1": { id: "column-1", title: "To Do", taskIds: [] },
      "column-2": { id: "column-2", title: "In Progress", taskIds: [] },
      "column-3": { id: "column-3", title: "Done", taskIds: [] },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  });

  // Fetch user data as task data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        const tasks = {};
        const taskIds = users.map((user) => {
          const taskId = `task-${user.id}`;
          tasks[taskId] = {
            id: taskId,
            title: `${user.name}`, // Setting the user name as task title
            content: `${user.email}, Phone: ${user.phone}`, // Setting email and phone as task description
            assignee: user.company.name, // Setting company name as assignee
          };
          return taskId;
        });

        const updatedColumns = {
          ...data.columns,
          "column-1": {
            ...data.columns["column-1"],
            taskIds: taskIds, // Place all tasks initially in the "To Do" column
          },
        };

        setData({ ...data, tasks: tasks, columns: updatedColumns });
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
          const newTaskIds = Array.from(start.taskIds);
          newTaskIds.splice(source.index, 1);
          newTaskIds.splice(destination.index, 0, draggableId);

          const newColumn = { ...start, taskIds: newTaskIds };

          setData({ ...data, columns: { ...data.columns, [newColumn.id]: newColumn } });
        } else {
          const startTaskIds = Array.from(start.taskIds);
          startTaskIds.splice(source.index, 1);
          const newStart = { ...start, taskIds: startTaskIds };

          const finishTaskIds = Array.from(finish.taskIds);
          finishTaskIds.splice(destination.index, 0, draggableId);
          const newFinish = { ...finish, taskIds: finishTaskIds };

          setData({ ...data, columns: { ...data.columns, [newStart.id]: newStart, [newFinish.id]: newFinish } });
        }
      }}
    >
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="kanban-column">
                <h2>{column.title}</h2>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="kanban-task"
                      >
                        <h3>{task.title}</h3>
                        <p>{task.content}</p>
                        <p><strong>Assignee:</strong> {task.assignee}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        );
      })}
    </DragDropContext>
  );
};

export default App;
