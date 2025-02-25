import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Toast } from "react-bootstrap";
// import { useDispatch } from "react-redux";
import { API_URL } from "../../Authentication/api";
import { toast } from "react-toastify";

// import { deleteProject } from "../ProjectSlice";

export default function DeleteModal({
  show,
  onClose,
  projectId,
  fetchProjects,
}) {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    (async () => {
      await axios.delete(`${API_URL}/projects/${projectId}`);
      fetchProjects(); // Fetch projects after delete a new one
      onClose();
      setLoading(false);
      toast.success("Project deleted successfully");
    })();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title>Delete Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this project?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Yes, Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
