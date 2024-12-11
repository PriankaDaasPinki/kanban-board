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
  const [newProject, setNewProject] = useState({
    newProjectTitle: "",
    newProjectContent: "",
  });

  const { newProjectTitle, newProjectContent } = newProject;

  const handleProjectChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleNewProjectSubmit = (e) => {
    e.preventDefault();
    const project = {
      id: uuidv4(),
      title: newProjectTitle,
      completed: newProjectContent,
    };

    dispatch(addProject(project));

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShow(false);
    }, 300);

    setNewProject("");
  };

  // Handle Project edit start
  const [editProject, setUpdateProject] = useState({
    editProjectId: "",
    editProjectTitle: "",
    editProjectContent: "",
  });

  const { editProjectId, editProjectTitle, editProjectContent } = editProject;

  const handleUpdateProjectChange = (e) => {
    setUpdateProject({ ...editProject, [e.target.name]: e.target.value });
  };
  const handleUpdateProjectCancel = (e) => {
    setUpdateProject({ ...editProject, editProjectId: null });
  };

  const handleEditStart = (projectId, currentTitle, currentContent) => {
    setUpdateProject({
      editProjectId: projectId,
      editProjectTitle: currentTitle,
      editProjectContent: currentContent,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedProject = {
      id: editProjectId,
      title: editProjectTitle,
      completed: editProjectContent,
    };
    dispatch(updateProject(updatedProject));

    setLoading(true);
    setTimeout(() => {
      console.log("Updated Project");
      setLoading(false);
      setShow(false);
    }, 300);

    setUpdateProject("");
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
    }, 300);

    // setData(newState);
    setShowDeleteWarning(false);
    setProjectToDelete(null); // Clear the Project to delete
    setShowDeleteWarningAfter(true);
    setTimeout(() => {
      setShowDeleteWarningAfter(false);
    }, 300);
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
        <div className="addTaskDiv mt-1">
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

      {editProjectId && (
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
                    name="editProjectTitle"
                    placeholder="Named Your Poject"
                    value={editProjectTitle}
                    onChange={handleUpdateProjectChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Project Requirements</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="editProjectContent"
                    placeholder="Update Your Requirements"
                    value={editProjectContent}
                    onChange={handleUpdateProjectChange}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleUpdateProjectCancel}>
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
        <form onSubmit={handleNewProjectSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                name="newProjectTitle"
                placeholder="Named Your Project"
                // value={newProjectTitle}
                onChange={handleProjectChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Project Requirements</Form.Label>
              <Form.Control
                as="textarea"
                name="newProjectContent"
                placeholder="Tell Your Requirements in Details"
                value={newProjectContent}
                onChange={handleProjectChange}
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