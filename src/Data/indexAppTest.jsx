import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Task 1" },
    "task-2": { id: "task-2", content: "Task 2" },
    "task-3": { id: "task-3", content: "Task 3" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

function App() {
  const [data, setData] = useState(initialData);
  const [newTaskContent, setNewTaskContent] = useState(""); // For adding new tasks
  const [isEditing, setIsEditing] = useState(null); // To track the task being edited
  const [editTaskContent, setEditTaskContent] = useState(""); // For task editing

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  // Function to handle form submission for new tasks
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new task ID and new task object
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = { id: newTaskId, content: newTaskContent };

    // Update the tasks object and add the task to the "To Do" column
    const updatedTasks = {
      ...data.tasks,
      [newTaskId]: newTask,
    };

    const updatedColumn = {
      ...data.columns["column-1"],
      taskIds: [...data.columns["column-1"].taskIds, newTaskId],
    };

    const newState = {
      ...data,
      tasks: updatedTasks,
      columns: {
        ...data.columns,
        [updatedColumn.id]: updatedColumn,
      },
    };

    setData(newState);
    setNewTaskContent(""); // Clear the input field
  };

  // Handle task edit start
  const handleEditStart = (taskId, currentContent) => {
    setIsEditing(taskId); // Set the task being edited
    setEditTaskContent(currentContent); // Populate the input with current task content
  };

  // Handle task edit submission
  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedTasks = {
      ...data.tasks,
      [isEditing]: { ...data.tasks[isEditing], content: editTaskContent }, // Update the content of the task being edited
    };

    const newState = {
      ...data,
      tasks: updatedTasks,
    };

    setData(newState);
    setIsEditing(null); // Close the edit mode
    setEditTaskContent(""); // Clear the edit field
  };

  // Handle task deletion
  const handleDeleteTask = (taskId, columnId) => {
    const updatedTasks = { ...data.tasks };
    delete updatedTasks[taskId]; // Remove task from tasks

    // Remove the task from its column's taskIds
    const updatedColumn = {
      ...data.columns[columnId],
      taskIds: data.columns[columnId].taskIds.filter((id) => id !== taskId),
    };

    const newState = {
      ...data,
      tasks: updatedTasks,
      columns: {
        ...data.columns,
        [updatedColumn.id]: updatedColumn,
      },
    };

    setData(newState);
  };

  return (
    <div>
      <h1>Kanban Board</h1>

      {/* Form to add new tasks */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return <Column key={column.id} column={column} tasks={tasks} onEdit={handleEditStart} onDelete={handleDeleteTask} />;
          })}
        </div>
      </DragDropContext>

      {/* Conditional rendering of the edit form */}
      {isEditing && (
        <div className="edit-form">
          <h3>Edit Task</h3>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={editTaskContent}
              onChange={(e) => setEditTaskContent(e.target.value)}
            />
            <button type="submit">Update Task</button>
            <button onClick={() => setIsEditing(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

function Column({ column, tasks, onEdit, onDelete }) {
  return (
    <div className="column">
      <h2>{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} onEdit={onEdit} onDelete={onDelete} columnId={column.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

function Task({ task, index, onEdit, onDelete, columnId }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onDoubleClick={() => onEdit(task.id, task.content)} // Double-click to start editing
        >
          {task.content}
          <button onClick={() => onDelete(task.id, columnId)} className="delete-btn">
            Delete
          </button>
        </div>
      )}
    </Draggable>
  );
}

export default App;
