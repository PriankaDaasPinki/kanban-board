import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addProject, updateProject } from "../ProjectSlice";

export default function ProjectModal({ show, onClose, project }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData({
      title: project?.title,
      content: project?.content || "",
    });
  }, [project]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (project?.id) {
      dispatch(updateProject({ id: project.id, ...formData })); // Edit project
      setFormData("");
    } else {
      dispatch(addProject({ id: uuidv4(), ...formData })); // Add new project
      setFormData("");
    }

    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 300);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {project?.id ? "Edit Project" : "Add New Project"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name Your Project"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Describe Your Description"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Logo</Form.Label>
            <Form.Control
              type="file"
              placeholder="Describe Your Description"
              // value={formData.content}
              // onChange={(e) =>
              //   setFormData({ ...formData, content: e.target.value })
              // }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" variant="danger" disabled={loading}>
            {loading
              ? project?.id
                ? "Updating..."
                : "Saving..."
              : project?.id
              ? "Update"
              : "Save"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
