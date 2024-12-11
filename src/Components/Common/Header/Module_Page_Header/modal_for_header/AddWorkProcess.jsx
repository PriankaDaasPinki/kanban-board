import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddWorkProcess = ({ show, handleClose, handleSubmit, inputValue, setInputValue }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Work Process</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formWorkProcess">
            <Form.Label>Process Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter process name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddWorkProcess;
