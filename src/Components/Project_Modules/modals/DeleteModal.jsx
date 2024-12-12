import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { deleteModule } from "../ModuleSlice";

export default function DeleteModal({ show, onClose, moduleId }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    dispatch(deleteModule(moduleId));
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 300);
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
