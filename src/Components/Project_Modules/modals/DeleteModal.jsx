import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

import { API_URL } from "../../Authentication/api";
export default function DeleteModal({
  show,
  onClose,
  moduleId,
  fetchProject_Module,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    (async () => {
      await axios.delete(`${API_URL}/project_module/${moduleId}`);
      fetchProject_Module(); // Fetch projects after delete a new one
      onClose();
      setLoading(false);
    })();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header>
        <Modal.Title>Delete Module</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this module?</p>
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
