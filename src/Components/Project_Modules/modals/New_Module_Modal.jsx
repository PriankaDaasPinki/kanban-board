import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addModule, updateModule } from "../ModuleSlice";

export default function New_Module_Modal({ show, onClose, module }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    setFormData({
      title: module?.title,
      content: module?.content || "",
    });
  }, [module]);

  module && console.log("formData.title  " + formData.id);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (module?.id) {
      dispatch(updateModule({ id: module.id, ...formData })); // Edit module
      setFormData("");
    } else {
      dispatch(addModule({ id: uuidv4(), ...formData })); // Add new module
      setFormData("");
    }

    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 300);
  };

  // console.log("module", module?.title);

  return (
    <Modal show={show} onHide={onClose}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {module?.id ? "Edit Module" : "Add New Module"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Module Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name Your Module"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Module Requirements</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Describe Your Requirements"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
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
