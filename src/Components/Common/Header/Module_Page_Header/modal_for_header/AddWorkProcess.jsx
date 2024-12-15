import React, { useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";

const AddWorkProcess = ({
  show,
  handleClose,
  handleAddWorkProcess,
  workProcesses,
  inputValue,
  setInputValue,
}) => {
  const [rows, setRows] = useState(workProcesses); // Stores all rows
  // const [workProcessList, setWorkProcessList] = useState([]); // Final submitted work processes
  // Add an empty row
  const addRow = () => {
    setRows([...rows, { processName: "", position: "", forward: "" }]);
  };
  // Update a specific row
  const updateRow = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  // Delete a row
  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  // Handle submission
  const handleSubmit = () => {
    // Filter out incomplete rows and sort by position
    const validRows = rows
      .filter((row) => row.processName && row.position && !isNaN(row.position))
      .sort((a, b) => Number(a.position) - Number(b.position));

    setInputValue(validRows);
    setRows([]); // Clear the table after submission
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modify Work Process</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* <Form.Group controlId="formWorkProcess"> */}
          {/* <Form.Label>Process Name</Form.Label> */}
          {/* <Form.Control
              type="text"
              placeholder="Enter process name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Form.Group> */}

          <Table bordered className="rounded" hover>
            <thead className="text-center">
              <tr>
                <th style={{ width: "300px" }}>Process Name</th>
                <th>Position</th>
                <th>Forward</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Process Name"
                      value={row.processName}
                      onChange={(e) =>
                        updateRow(index, "processName", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder="Position"
                      value={row.position}
                      onChange={(e) =>
                        updateRow(index, "position", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      placeholder="Forward"
                      value={row.forward}
                      onChange={(e) =>
                        updateRow(index, "forward", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => deleteRow(index)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    <Button variant="success" onClick={addRow}>
                      Add More Process
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Add Row Button */}
          {rows.length > 0 && (
            <div className="text-center my-3">
              <Button variant="success" onClick={addRow}>
                Add More Process
              </Button>
            </div>
          )}

          {/* Submit Button */}
          {/* <div className="text-center mt-4">
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddWorkProcess;
