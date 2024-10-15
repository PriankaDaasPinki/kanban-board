import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "../CSS/boardStyle.css";
import Column from "./Column";
import initialData from "../Data/initial-data";
import { Button, Form, Modal } from "react-bootstrap";
import { MdOutlineAddTask } from "react-icons/md";
// import Task from "./Task";

export default function Board(showModal) {
  // const [completed, setCompeted] = useState([]);
  // const [incomplete, setIncompete] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState(initialData);
  const handleDragEnd = (result) => {
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

  //Add task start here
  const [newTaskTitle, setNewTaskTitle] = useState(""); // state for the form input
  const [newTaskContent, setNewTaskContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new task ID and new task object
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = {
      id: newTaskId,
      title: newTaskTitle,
      content: newTaskContent,
    };

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

    console.log(initialData);

    setData(newState);
    setNewTaskTitle(""); // Clear the input field
    setNewTaskContent(""); // Clear the input field
  };

  // Handle task edit start
  const [isEditing, setIsEditing] = useState(null); // To track the task being edited
  const [editTaskTitle, setEditTaskTitle] = useState(""); // For task title editing
  const [editTaskContent, setEditTaskContent] = useState(""); // For task content editing

  const handleEditStart = (taskId, currentTitle, currentContent) => {
    setIsEditing(taskId); // Set the task being edited
    setEditTaskTitle(currentTitle); // Populate the input with current task title
    setEditTaskContent(currentContent); // Populate the input with current task content
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedTasks = {
      ...data.tasks,
      [isEditing]: {
        ...data.tasks[isEditing],
        title: editTaskTitle,
        content: editTaskContent,
      }, // Update the content of the task being edited
    };

    const newState = {
      ...data,
      tasks: updatedTasks,
    };

    setData(newState);
    setIsEditing(null); // Close the edit mode
    setEditTaskTitle(""); // Clear the edit field
    setEditTaskContent(""); // Clear the edit field
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="boardStyle">
          <div className="addTaskDiv">
            <Button variant="primary" onClick={handleShow}>
              <MdOutlineAddTask className="addTaskIconApp" />
            </Button>
          </div>
          {/* <h1 className="boardTitle">Project Progress Board</h1> */}
          <div className="taskColumnBoard">
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  onEdit={handleEditStart}
                />
              );
            })}
          </div>
        </div>
      </DragDropContext>

      {isEditing && (
        <Modal show="true">
          <div className="edit-form">
            <form onSubmit={handleEditSubmit}>
              <Modal.Header>
                <Modal.Title>Edit Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Named Your Task"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Describe Your Task Here"
                    value={editTaskContent}
                    onChange={(e) => setEditTaskContent(e.target.value)}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsEditing(null)}>
                  Close
                </Button>
                <Button type="submit" variant="danger" onClick={handleClose}>
                  Update Task
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal>
      )}

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Named Your Task"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Describe Your Task Here"
                value={newTaskContent}
                onChange={(e) => setNewTaskContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assignee</Form.Label>
              <Form.Control type="text" placeholder="Name of Assignee" />
              <Form.Text className="text-muted">
                Who is assigned for the task
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="danger" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
