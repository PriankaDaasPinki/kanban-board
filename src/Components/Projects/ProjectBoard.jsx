import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { MdOutlineAddTask } from "react-icons/md";
import { useDispatch } from "react-redux";

import "../../CSS/boardStyle.css";
import {
  addProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from "./ProjectSlice";
import { useSelector } from "react-redux";
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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  //Add Project start here
  const [newProjectTitle, setNewProjectTitle] = useState(""); // state for the form input
  const [newProjectContent, setNewProjectContent] = useState("");
  const [newProjectDate, setNewProjectDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //redux toolkit test
    const project = {
      id: uuidv4(),
      title: newProjectTitle,
      completed: newProjectContent,
    };
    dispatch(addProject(project));

    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      console.log("Saved Project");
      setLoading(false);
      setShow(false);
    }, 300);

    setNewProjectTitle(""); // Clear the input field
    setNewProjectContent(""); // Clear the input field
  };

  // Handle Project edit start
  const [isEditing, setIsEditing] = useState(null); // To track the Project being edited
  const [editProjectTitle, setEditProjectTitle] = useState(""); // For Project title editing
  const [editProjectContent, setEditProjectContent] = useState(""); // For Project content editing

  const handleEditStart = (projectId, currentTitle, currentContent) => {
    setIsEditing(projectId); // Set the Project being edited
    setEditProjectTitle(currentTitle); // Populate the input with current Project title
    setEditProjectContent(currentContent); // Populate the input with current Project content
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedProject = {
      id: isEditing,
      title: editProjectTitle,
      completed: editProjectContent,
    };
    dispatch(updateProject(updatedProject));

    setLoading(true);
    setTimeout(() => {
      console.log("Updated Project");
      setLoading(false);
      setShow(false);
    }, 3000);

    // setData(newState);
    setIsEditing(null); // Close the edit mode
    setEditProjectTitle(""); // Clear the edit field
    setEditProjectContent(""); // Clear the edit field
  };

  // Project Delete
  const [projectToDelete, setProjectToDelete] = useState(null); // Store Project to delete
  const [showDeleteWarning, setShowDeleteWarning] = useState(false); // Track delete warning visibility
  const [showDeleteWarningAfter, setShowDeleteWarningAfter] = useState(false); // Track delete warning visibility

  // Show delete warning before deleting
  const handleDeleteProjectWarning = (projectId) => {
    setProjectToDelete({ projectId });
    setShowDeleteWarning(true); // Show warning dialog
  };

  // Confirm and proceed with delete
  const handleConfirmDelete = () => {
    const { projectId } = projectToDelete;
    dispatch(deleteProject(projectId));
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      console.log("Deleted project");
      setLoading(false);
      setShow(false);
    }, 3000);

    // setData(newState);
    setShowDeleteWarning(false);
    setProjectToDelete(null); // Clear the Project to delete
    setShowDeleteWarningAfter(true);
    setTimeout(() => {
      setShowDeleteWarningAfter(false);
    }, 6000);
    <test />;
  };

  // Cancel delete operation
  const handleCancelDelete = () => {
    setShowDeleteWarning(false);
    setProjectToDelete(null); // Reset ProjectToDelete when canceling
  };

  return (
    <>
      <div className="boardStyle" id="elementFull">
        <div className="addTaskDiv">
          <Button variant="primary" onClick={handleShow}>
            <MdOutlineAddTask className="addTaskIconApp" />
          </Button>
        </div>
        {/* <h2 className="pt-3">All Projects</h2> */}

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

        <div className="grid-container">
          {projects &&
            projects.map((project, key) => {
              // console.log(project);
              const { id, title, completed } = project;
              return (
                <Project
                  id={id}
                  index={key}
                  projectTitle={title}
                  completed={completed}
                  onEdit={handleEditStart}
                  onDelete={handleDeleteProjectWarning}
                />
              );
            })}
        </div>
      </div>

      {isEditing && (
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
                    value={editProjectTitle}
                    onChange={(e) => setEditProjectTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Project Requirements</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Update Your Requirements"
                    value={editProjectContent}
                    onChange={(e) => setEditProjectContent(e.target.value)}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsEditing(null)}>
                  Close
                </Button>
                <Button type="submit" variant="danger" disabled={loading}>
                  {loading ? "Update Project..." : "Update Project"}
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal>
      )}

      {showDeleteWarning && (
        <Modal className="deleteWarning" show="true">
          <Modal.Header>
            <Modal.Title>Delete Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure you want to delete this Project?</h4>
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
          The Project is deleted
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
                value={newProjectContent}
                onChange={(e) => setNewProjectContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newProjectDate}
                onChange={(e) => setNewProjectDate(e.target.value)}
              />
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
