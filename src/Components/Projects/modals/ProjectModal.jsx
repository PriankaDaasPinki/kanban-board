import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

import { useUser } from "../../Authentication/authSlice";
import { API_URL } from "../../Authentication/api";
import { toast } from "react-toastify";

export default function ProjectModal({
  show,
  onClose,
  project,
  fetchProjects,
}) {
  // Get the logged-in user from Redux
  const user = useSelector(useUser);

  const [formData, setFormData] = useState({
    project_name: "",
    description: "",
    owner_id: "", // Assign owner_id from logged-in user
    // logo: null, // Handle file for logo
  });

  const [loading, setLoading] = useState(false);

  // Populate form data if editing an existing project
  useEffect(() => {
    if (project) {
      setFormData({
        project_name: project.project_name || "",
        description: project.description || "",
        logo: project.logo || null,
        owner_id: user.user.user_id || "",
      });
    }
  }, [project, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation to check if project name is provided
    if (!formData.project_name.trim()) {
      toast.error("Project name is required");
      // alert("Project name is required");
      setLoading(false);
      return;
    }

    // Prepare data for API request
    const formPayload = new FormData();
    formPayload.append("project_name", formData.project_name);
    formPayload.append("description", formData.description);
    formPayload.append("owner_id", formData.owner_id);

    // If logo is selected, append it to the form data
    if (formData.logo) {
      formPayload.append("logo", formData.logo);
    }

    try {
      if (project?.project_id) {
        // Update existing project
        await axios.put(
          `${API_URL}/projects/update/${project.project_id}`,
          formPayload,
          { headers: { "Content-Type": "application/json" } }
        );
        fetchProjects(); // Fetch projects after update project data
        toast.success("Project updated successfully!");
        // alert("Project updated successfully!");
      } else {
        // Create new project
        await axios.post(`${API_URL}/projects/create`, formPayload, {
          headers: { "Content-Type": "application/json" },
        });
        fetchProjects(); // Fetch projects after creating a new one
        toast.success("Project created successfully!");
        // alert("Project created successfully!");
      }

      // Reset form data and close the modal after successful operation
      setFormData({
        project_name: "",
        description: "",
        owner_id: "",
        logo: null,
      });
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error submitting project:", error);
      setLoading(false);
      toast.error("Error while saving project. Please try again.");
      // alert("Error while saving project. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, logo: file });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {project?.project_id ? "Edit Project" : "Add New Project"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name Your Project"
              value={formData.project_name}
              onChange={(e) =>
                setFormData({ ...formData, project_name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Describe Your Project"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Project Logo</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" variant="danger" disabled={loading}>
            {loading
              ? project?.project_id
                ? "Updating..."
                : "Saving..."
              : project?.project_id
              ? "Update"
              : "Save"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
