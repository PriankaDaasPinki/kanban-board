import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaList, FaRegEdit, FaUserSecret } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import styled from "styled-components";

import "../../CSS/boardStyle.css";

export default function BoardForAllTasks({ tasks = [] }) {
  console.log("Initial tasks: ", tasks);

  const initialColumns = {
    "To Do": { id: "To Do", taskIds: [] },
    "In Progress": { id: "In Progress", taskIds: [] },
    Paused: { id: "Paused", taskIds: [] },
    Completed: { id: "Completed", taskIds: [] },
  };

  const [data, setData] = useState({
    tasks: {},
    columns: initialColumns,
    columnOrder: ["To Do", "In Progress", "Paused", "Completed"],
    assigneeOptions: ["Ram", "Sam", "Madhu", "Unassigned"],
  });

  // Initialize the columns based on provided tasks
  useEffect(() => {
    const updatedColumns = { ...initialColumns };
    const tasksObj = {};

    tasks.forEach((task) => {
      const columnKey =
        task.stage === "to do"
          ? "To Do"
          : task.stage === "in progress"
          ? "In Progress"
          : task.stage;

      if (updatedColumns[columnKey]) {
        updatedColumns[columnKey].taskIds.push(`task-${task.task_id}`);
      }

      tasksObj[`task-${task.task_id}`] = task; // Store task by ID
    });

    setData((prev) => ({
      ...prev,
      tasks: tasksObj,
      columns: updatedColumns,
    }));
  }, [tasks]);

  const handleDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [start.id]: { ...start, taskIds: newTaskIds },
        },
      }));
      return;
    }

    // Moving to another column
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [start.id]: { ...start, taskIds: startTaskIds },
        [finish.id]: { ...finish, taskIds: finishTaskIds },
      },
    }));
  };

  const dateFormate = (dateToFormat) => {
    const today = new Date(dateToFormat);
    return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  };

  const Container = styled.div`
    background-color: ${(props) =>
      props.isDragging ? "lightgreen" : "#fffada"};
  `;

  console.log("tasks ", tasks);
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="boardStyle">
        <div className="d-flex flex-column columnBoard">
          <div className="taskColumnBoard">
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              if (!column) return null;

              return (
                <div className="column" key={column.id}>
                  <div className="column_title">{column.id}</div>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        className="task-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {column.taskIds.map((taskId, index) => {
                          const task = data.tasks[taskId];
                          if (!task) return null;

                          return (
                            <Draggable
                              key={taskId}
                              draggableId={taskId}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <Container
                                  className="task taskContainer"
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  isDragging={snapshot.isDragging}
                                >
                                  <div className="iconListBar">
                                    <FaList className="icons icon" />
                                    <div className="iconsList">
                                      <FaRegEdit className="icons" />
                                      <RiDeleteBin5Line className="icons" />
                                    </div>
                                  </div>
                                  <div className="taskTitle">
                                    {task?.task_name}
                                  </div>
                                  <div className="taskDesc">
                                    {task?.description}
                                  </div>
                                  <div className="taskFooter flex-column align-items-start">
                                    <p className="dueDate">
                                      Start Date:{" "}
                                      {task?.start_date
                                        ? dateFormate(task?.start_date)
                                        : "Not set"}
                                    </p>
                                    <p className="dueDate">
                                      End Date:{" "}
                                      {task?.end_date
                                        ? dateFormate(task?.end_date)
                                        : "Not set"}
                                    </p>
                                    <div className="d-flex align-items-center py-1">
                                      <FaUserSecret />
                                      <p className="m-0 ps-2">
                                        {task?.assignee.name}
                                      </p>
                                    </div>
                                  </div>
                                </Container>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
