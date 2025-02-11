import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

import { useUser } from "../../Authentication/authSlice";
import { API_URL } from "../../Authentication/api";

export default function New_Module_Modal({
  show,
  onClose,
  module,
  project_id,
  fetchProject_Module,
}) {
  const [formData, setFormData] = useState({});
  // Get the logged-in user from Redux
  const user = useSelector(useUser);

  useEffect(() => {
    setFormData({
      module_name: module?.module_name || "",
      description: module?.description || "",
      position: module?.module_id || "",
      project_id: project_id,
      created_by: user.user.user_id,
    });
  }, [module, user, project_id]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation to check if project name is provided
    if (!formData.module_name.trim()) {
      alert("Project name is required");
      setLoading(false);
      return;
    }

    // Prepare data for API request
    const formPayload = new FormData();
    formPayload.append("module_name", formData.module_name);
    formPayload.append("project_id", formData.project_id);
    formPayload.append("created_by", formData.created_by);

    if (formData.description) {
      formPayload.append("description", formData.description);
    }

    try {
      if (module?.module_id) {
        // Update existing project
        await axios.put(
          `${API_URL}/project_module/update/${module.module_id}`,
          formPayload,
          { headers: { "Content-Type": "application/json" } }
        );
        fetchProject_Module(); // Fetch project module after update project data
        alert("Project Module updated successfully!");
      } else {
        // Create new project
        await axios.post(`${API_URL}/project_module/create`, formPayload, {
          headers: { "Content-Type": "application/json" },
        });
        fetchProject_Module(); // Fetch projects after creating a new one
        alert("Project created successfully!");
      }

      // Reset form data and close the modal after successful operation
      setFormData({
        module_name: "",
        description: "",
        project_id: "",
        created_by: "",
        position: "",
      });
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error submitting project module:", error);
      setLoading(false);
      alert("Error while saving project module. Please try again.");
    }

    // if (module?.module_id) {
    //   dispatch(updateModule({ id: module.module_id, ...formData })); // Edit module
    //   setFormData("");
    // } else {
    //   dispatch(addModule({ id: uuidv4(), ...formData })); // Add new module
    //   setFormData("");
    // }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {module?.module_id ? "Edit Module" : "Add New Module"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Module Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name Your Module"
              value={formData.module_name}
              onChange={(e) =>
                setFormData({ ...formData, module_name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Module Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Describe Your Requirements"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Module Position</Form.Label>
            <Form.Control
              type="number"
              placeholder="Module Position"
              value={formData.position}
              // onChange={(e) =>
              //   setFormData({ ...formData, position: e.target.value })
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
              ? module?.id
                ? "Updating..."
                : "Saving..."
              : module?.id
              ? "Update"
              : "Save"}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
