import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "../CSS/boardStyle.css";
import Column from "./Column";
import initialData, { assigneeOptions } from "../Data/initial-data";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { MdOutlineAddTask } from "react-icons/md";
// import ApiDataTry from "../Data/ApiDataTry";
// import test from "./test";

export default function Board(Data) {
  // const data1 = Data.Data;
  console.log("1st in Board component");
  const data1 = Data.Data;
  const data2  = Data;
  console.log('data1',data1);
  console.log('data2',data2);

  // console.log("initial data from board");
  // console.log(initialData.columns);
  // const [completed, setCompeted] = useState([]);
  // const [incomplete, setIncompete] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setData] = useState(data1);

  console.log('data',data)


  const handleDragEnd = (result) => {
    console.log("inside function");
    console.log(data1);

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
    // const newTask = {
    //   id: newTaskId,
    //   title: newTaskTitle,
    //   content: newTaskContent,
    //   assignee: "Unassigned",
    // };

    // Update the tasks object and add the task to the "To Do" column
    // const updatedTasks = {
    //   ...data.tasks,
    //   [newTaskId]: newTask,
    // };

    // const updatedColumn = {
    //   ...data.columns["column-1"],
    //   taskIds: [...data.columns["column-1"].taskIds, newTaskId],
    // };

    // const newState = {
    //   ...data,
    //   tasks: updatedTasks,
    //   columns: {
    //     ...data.columns,
    //     [updatedColumn.id]: updatedColumn,
    //   },
    // };

    // setData(newState);
    setNewTaskTitle(""); // Clear the input field
    setNewTaskContent(""); // Clear the input field
  };

  // Handle task edit start
  const [isEditing, setIsEditing] = useState(null); // To track the task being edited
  const [editTaskTitle, setEditTaskTitle] = useState(""); // For task title editing
  const [editTaskContent, setEditTaskContent] = useState(""); // For task content editing
  const [editTaskAssignee, setEditTaskAssignee] = useState("");

  const handleEditStart = (
    taskId,
    currentTitle,
    currentContent,
    currentAssignee
  ) => {
    setIsEditing(taskId); // Set the task being edited
    setEditTaskTitle(currentTitle); // Populate the input with current task title
    setEditTaskContent(currentContent); // Populate the input with current task content
    setEditTaskAssignee(currentAssignee); // Populate the input with current task assignee
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    // const updatedTasks = {
    //   ...data?.tasks,
    //   [isEditing]: {
    //     ...data.tasks[isEditing],
    //     title: editTaskTitle,
    //     content: editTaskContent,
    //     assignee: editTaskAssignee,
    //   }, // Update the content of the task being edited
    // };

    // const newState = {
    //   ...data,
    //   tasks: updatedTasks,
    // };

    // setData(newState);
    // setIsEditing(null); // Close the edit mode
    // setEditTaskTitle(""); // Clear the edit field
    // setEditTaskContent(""); // Clear the edit field
    // setEditTaskAssignee(""); // Clear the edit field
  };

  // Task Delete
  const [taskToDelete, setTaskToDelete] = useState(null); // Store task to delete
  const [showDeleteWarning, setShowDeleteWarning] = useState(false); // Track delete warning visibility
  const [showDeleteWarningAfter, setShowDeleteWarningAfter] = useState(false); // Track delete warning visibility

  // const ShowDeleteWarningAfter = () => setShowDeleteWarningAfter(false);

  // Show delete warning before deleting
  const handleDeleteTaskWarning = (taskId, columnId) => {
    setTaskToDelete({ taskId, columnId });
    setShowDeleteWarning(true); // Show warning dialog
  };

  // Confirm and proceed with delete
  const handleConfirmDelete = () => {
    const { taskId, columnId } = taskToDelete;

    const updatedTasks = { ...data.tasks };
    delete updatedTasks[taskId];

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
    setShowDeleteWarning(false);
    setTaskToDelete(null); // Clear the task to delete
    setShowDeleteWarningAfter(true);
    setTimeout(() => {
      setShowDeleteWarningAfter(false);
    }, 6000);
    <test />;
  };

  // Cancel delete operation
  const handleCancelDelete = () => {
    setShowDeleteWarning(false);
    setTaskToDelete(null); // Reset taskToDelete when canceling
  };
  // Handle task deletion
  // const handleDeleteTask = (taskId, columnId) => {
  //   const updatedTasks = { ...data.tasks };
  //   delete updatedTasks[taskId]; // Remove task from tasks

  //   // Remove the task from its column's taskIds
  //   const updatedColumn = {
  //     ...data.columns[columnId],
  //     taskIds: data.columns[columnId].taskIds.filter((id) => id !== taskId),
  //   };

  //   const newState = {
  //     ...data,
  //     tasks: updatedTasks,
  //     columns: {
  //       ...data.columns,
  //       [updatedColumn.id]: updatedColumn,
  //     },
  //   };

  //   setData(newState);
  // };

  // Handle Assignee change   // handleAssignee
  // const [showDropdown, setShowDropdown] = useState(null); // To control which dropdown is shown
  // const handleShowDropdown = (taskId) => {
  //   setShowDropdown(showDropdown === taskId ? null : taskId); // Toggle dropdown visibility for each task
  // };

  // Handle changing the assignee
  // const handleChangeAssignee = (taskId, newAssignee) => {
  //   const updatedTasks = {
  //     ...data.tasks,
  //     [taskId]: { ...data.tasks[taskId], assignee: newAssignee }, // Update the assignee for the task
  //   };

  //   const newState = {
  //     ...data,
  //     tasks: updatedTasks,
  //   };

  //   setData(newState);
  //   setShowDropdown(null); // Hide dropdown after selection
  // };

  // const handleAssignee = (e) => {
  //   e.preventDefault();

  //   const updatedTasks = {
  //     ...data.tasks,
  //     [isEditing]: {
  //       ...data.tasks[isEditing],
  //       title: editTaskTitle,
  //       content: editTaskContent,
  //     }, // Update the content of the task being edited
  //   };

  //   const newState = {
  //     ...data,
  //     tasks: updatedTasks,
  //   };

  //   setData(newState);
  //   setIsEditing(null); // Close the edit mode
  //   setEditTaskTitle(""); // Clear the edit field
  //   setEditTaskContent(""); // Clear the edit field
  // };

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
            {data?.columnOrder?.map((columnId) => {
              const column = data?.columns[columnId];
              const tasks = column?.taskIds?.map((taskId) => data?.tasks[taskId]);

              return (
                <Column
                  key={column?.id}
                  column={column}
                  tasks={tasks}
                  onEdit={handleEditStart}
                  onDelete={handleDeleteTaskWarning}
                  // onDelete={handleDeleteTask}
                  // onShowDropdown={handleShowDropdown}
                  // showDropdown={showDropdown}
                  // onChangeAssignee={handleChangeAssignee}
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
                    as="textarea"
                    placeholder="Describe Your Task Here"
                    value={editTaskContent}
                    onChange={(e) => setEditTaskContent(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Assignee</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setEditTaskAssignee(e.target.value)}
                  >
                    <option value={editTaskAssignee}>{editTaskAssignee}</option>
                    {assigneeOptions.map((assignee) => (
                      <option value={assignee}>{assignee}</option>
                    ))}
                  </Form.Select>
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

      {showDeleteWarning && (
        <Modal className="deleteWarning" show="true">
          <Modal.Header>
            <Modal.Title>Delete Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure you want to delete this task?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="danger"
              onClick={handleConfirmDelete}
            >
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showDeleteWarningAfter && (
        <Alert
          key="success"
          variant="success"
          className="d-flex justify-content-evenly position-absolute alartDiv"
        >
          The task is deleted
          {/* <div
            className="p-2 okButton"
            variant=""
            onClick={ShowDeleteWarningAfter}
          >
            OK
          </div> */}
        </Alert>

        //setShowDeleteWarningAfter(false)

        // <Modal show="true" className="deleteWarning">
        //   <Modal.Body className="d-flex justify-content-evenly">
        //     <h4>The task is deleted</h4>
        //     <Button variant="secondary" onClick={ShowDeleteWarningAfter}>
        //       OK
        //     </Button>
        //   </Modal.Body>
        // </Modal>

        // <Alert key="danger" variant="danger">
        //   This is a alert with <Alert.Link href="#">an example link</Alert.Link>
        //   . Give it a click if you like.
        // </Alert>
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
                as="textarea"
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
