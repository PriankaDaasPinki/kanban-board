import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { MdOutlineAddTask } from "react-icons/md";
import initialData from "../Data/initial-data";

import "../CSS/addTaskModal.css";

function AddTaskModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newTaskContent, setNewTaskContent] = useState(""); // state for the form input
  const [data, setData] = useState(initialData);
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new task ID and new task object
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = { id: newTaskId, content: newTaskContent };

    // Update the tasks object and add the task to the "To Do" column
    const updatedTasks = {
      ...data.tasks,
      [newTaskId]: newTask,
    };

    const updatedColumn = {
      ...data.columns["column-1"],
      taskIds: [...data.columns["column-1"].taskIds, newTaskId],
    };

    const newState = {
      ...data,
      tasks: updatedTasks,
      columns: {
        ...data.columns,
        [updatedColumn.id]: updatedColumn,
      },
    };

    console.log(initialData);

    setData(newState);
    setNewTaskContent(""); // Clear the input field
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <MdOutlineAddTask className="addTaskIconApp" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form style={{ marginTop: "7rem" }} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter new task"
                value={newTaskContent}
                onChange={(e) => setNewTaskContent(e.target.value)}
              />
              <button type="submit">Add Task</button>
            </form>
          </div>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="text" placeholder="Named Your Task" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Describe Your Task Here"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assignee</Form.Label>
              <Form.Control type="text" placeholder="Name of Assignee" />
              <Form.Text className="text-muted">
                Who is assigned for the task
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTaskModal;
