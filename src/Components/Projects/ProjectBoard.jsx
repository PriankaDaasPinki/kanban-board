import React, { useEffect, useState } from "react";
// import { DragDropContext } from "react-beautiful-dnd";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { MdOutlineAddTask } from "react-icons/md";
import { useDispatch } from "react-redux";

import "../../CSS/boardStyle.css";
// import ProjectColumn from "./ProjectColumn";
import { addProject, deleteProject, fetchProjects, updateProject } from "./ProjectSlice";
import { useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
// import { FaRegEdit } from "react-icons/fa";
import Project from "./Project";
import { v4 as uuidv4 } from "uuid";

export default function PojectBoard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const { isLoading, projects, error } = useSelector(
    (state) => state.projectsReducer
  );

  const onDeleteProject = (projectId) => {
    dispatch(deleteProject(projectId));
  };

  const onEdit = (projectId) => {
    dispatch(updateProject(projectId));
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

 
  //Add task start here
  const [newProjectTitle, setNewProjectTitle] = useState(""); // state for the form input
  const [newTaskContent, setNewTaskContent] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //redux toolkit test
    const project = {
      id: uuidv4(),
      title: newProjectTitle,
      completed: newTaskContent,
    };
    dispatch(addProject(project));

    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      console.log("Saved task");
      setLoading(false);
      setShow(false);
    }, 3000);

    
    setNewProjectTitle(""); // Clear the input field
    setNewTaskContent(""); // Clear the input field
    setNewTaskDate("");
    setNewTaskAssignee("");
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

  // const handleEditSubmit = (e) => {
  //   e.preventDefault();

  //   const updatedTasks = {
  //     ...data?.tasks,
  //     [isEditing]: {
  //       ...data.tasks[isEditing],
  //       title: editTaskTitle,
  //       content: editTaskContent,
  //       assignee: editTaskAssignee,
  //     }, // Update the content of the task being edited
  //   };

  //   const newState = {
  //     ...data,
  //     tasks: updatedTasks,
  //   };

  //   setLoading(true);
  //   setTimeout(() => {
  //     console.log("Updated task");
  //     setLoading(false);
  //     setShow(false);
  //   }, 3000);

  //   setData(newState);
  //   setIsEditing(null); // Close the edit mode
  //   setEditTaskTitle(""); // Clear the edit field
  //   setEditTaskContent(""); // Clear the edit field
  //   setEditTaskAssignee(""); // Clear the edit field
  // };

  // Task Delete
  const [taskToDelete, setTaskToDelete] = useState(null); // Store task to delete
  const [showDeleteWarning, setShowDeleteWarning] = useState(false); // Track delete warning visibility
  const [showDeleteWarningAfter, setShowDeleteWarningAfter] = useState(false); // Track delete warning visibility

  // Show delete warning before deleting
  const handleDeleteTaskWarning = (taskId, columnId) => {
    setTaskToDelete({ taskId, columnId });
    setShowDeleteWarning(true); // Show warning dialog
  };

  // Confirm and proceed with delete
  // const handleConfirmDelete = () => {
  //   const { taskId, columnId } = taskToDelete;

  //   const updatedTasks = { ...data.tasks };
  //   delete updatedTasks[taskId];

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

  //   setLoading(true);
  //   // Simulate an API call
  //   setTimeout(() => {
  //     console.log("Deleted task task");
  //     setLoading(false);
  //     setShow(false);
  //   }, 3000);

  //   setData(newState);
  //   setShowDeleteWarning(false);
  //   setTaskToDelete(null); // Clear the task to delete
  //   setShowDeleteWarningAfter(true);
  //   setTimeout(() => {
  //     setShowDeleteWarningAfter(false);
  //   }, 6000);
  //   <test />;
  // };

  // Cancel delete operation
  const handleCancelDelete = () => {
    setShowDeleteWarning(false);
    setTaskToDelete(null); // Reset taskToDelete when canceling
  };

  return (
    <>
      <div className="boardStyle">
        <div className="addTaskDiv">
          <Button variant="primary" onClick={handleShow}>
            <MdOutlineAddTask className="addTaskIconApp" />
          </Button>
        </div>
        <h2 className="pt-5 mt-5">All Projects</h2>

        {isLoading && (
          <div className="p-5 mt-5">
            <h1>Loading......</h1>
          </div>
        )}
        {error && (
          <div className="p-5 mt-5">
            <h1>{error}</h1>
          </div>
        )}
        {/* <button className="p-2 mt-5 mb-3" onClick={handleShow}>Add task</button>   
          <div className="taskColumnBoard"> */}
        <div className="grid-container">
          {projects &&
            projects.map((project, key) => {
              console.log(project);
              const { id, title, completed } = project;
              return (
                <Project
                  id={id}
                  index={key}
                  projectTitle={title}
                  completed={completed}
                  onEdit={onEdit}
                  onDelete={onDeleteProject}
                />
              );
              // return (
              //   <div className="p-2 m-1 bg-secondary">
              //     <div className="d-flex align-items-center justify-content-between ps-3 pe-3">
              //       <RiDeleteBin5Line onClick={() => onDeleteProject(id)} />
              //       <FaRegEdit
              //         className="editIcon"
              //         onClick={() => handleEditStart(id, title, completed)}
              //       />
              //     </div>

              //     {/* <div className="p-2 bg-secondary">
              //       <h6>{title.slice(title, 10)}</h6>
              //       <h6>{id}</h6>
              //       <h6>{completed}</h6>
              //     </div> */}
              //   </div>
              // );
            })}
        </div>

        {/* <div className="d-flex flex-column columnBoard">
          <h2>All Projects</h2>
          <div className="taskColumnBoard">
            {projects.map((project, key) => {
              const { id, title, completed } = project;
              return (
                <Project
                  id={id}
                  index={key}
                  projectTitle={title}
                  completed={completed}
                  onEdit={onEdit}
                  onDeleteTask={onDeleteProject}
                />
              );
            })}
          </div>
        </div> */}
      </div>

      {/* {isEditing && (
        <Modal show="true">
          <div className="edit-form">
            <form onSubmit={handleEditSubmit}>
              <Modal.Header>
                <Modal.Title>Edit Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Named Your Poject"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Project Requirements</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Update Your Requirements"
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
                    {data.assigneeOptions.map((assignee) => (
                      <option value={assignee}>{assignee}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsEditing(null)}>
                  Close
                </Button>
                <Button type="submit" variant="danger" disabled={loading}>
                  {loading ? "Update Task..." : "Update Task"}
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal>
      )} */}

      {/* {showDeleteWarning && (
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
      )} */}

      {showDeleteWarningAfter && (
        <Alert
          key="success"
          variant="success"
          className="d-flex justify-content-evenly position-absolute alartDiv"
        >
          The task is deleted
        </Alert>
      )}

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Named Your Project"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Project Requirements</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Tell Your Requirements in Details"
                value={newTaskContent}
                onChange={(e) => setNewTaskContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newTaskDate}
                onChange={(e) => setNewTaskDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cordinator</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name of Project Cordinator"
                value={newTaskAssignee}
                onChange={(e) => setNewTaskAssignee(e.target.value)}
              />
              {/* <Form.Text className="text-muted">
                Who is esponsible for the task
              </Form.Text> */}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="danger" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
