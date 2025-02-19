import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { MdOutlineAddTask } from "react-icons/md";
import initialData from "../../Data/initial-data";

import "../CSS/addTaskModal.css";
import axios from "axios";
import { API_URL } from "../Authentication/api";

function AddTaskModal({task}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newTaskContent, setNewTaskContent] = useState(""); // state for the form input
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault();

    // Basic validation to check if project name is provided
    if (!newTaskContent.task_name.trim()) {
      alert("Task name is required");
      setLoading(false);
      return;
    } else if (!newTaskContent.stage.trim()) {
      alert("stage is required");
      setLoading(false);
      return;
    } else if (!newTaskContent.project_id.trim()) {
      alert("Project ID is required");
      setLoading(false);
      return;
    } else if (!newTaskContent.module_id.trim()) {
      alert("Module ID is required");
      setLoading(false);
      return;
    } else if (!newTaskContent.assignee.trim()) {
      alert("assignee is required");
      setLoading(false);
      return;
    } else if (!newTaskContent.start_date.trim()) {
      alert("start_date is required");
      setLoading(false);
      return;
    } else if (!newTaskContent.end_date.trim()) {
      alert("end_date is required");
      setLoading(false);
      return;
    }

    // Create a new task ID and new task object
    // const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    // const newTask = { id: newTaskId, content: newTaskContent };

    // Update the tasks object and add the task to the "To Do" column
    // const updatedTasks = {
    //   ...data.tasks,
    //   [newTaskId]: newTask,
    // };

    // const updatedColumn = {
    //   ...data.columns["column-1"],
    //   taskIds: [...data.columns["column-1"].taskIds, newTaskId],
    // };

    // const newState = {
    //   ...data,
    //   tasks: updatedTasks,
    //   columns: {
    //     ...data.columns,
    //     [updatedColumn.id]: updatedColumn,
    //   }, 
    // };


    // Prepare data for API request
    
    const formPayload = new FormData();
    formPayload.append("task_name", newTaskContent.module_name);
    formPayload.append("stage", newTaskContent.stage);
    formPayload.append("created_by", newTaskContent.created_by);
    formPayload.append("project_id", newTaskContent.project_id);
    formPayload.append("module_id", newTaskContent.module_id);
    formPayload.append("assignee", newTaskContent.assignee);
    formPayload.append("start_date", newTaskContent.start_date);
    formPayload.append("end_date", newTaskContent.end_date);

    if (newTaskContent.description) {
      formPayload.append("description", newTaskContent.description);
    }

    try {
      if (module?.module_id) {
        // Update existing project
        await axios.put(
          `${API_URL}/tasks/update/${module.module_id}`,
          formPayload,
          { headers: { "Content-Type": "application/json" } }
        );
        fetchProject_Module(); // Fetch project module after update project data
        alert("Task updated successfully!");
      } else {
        // Create new project
        await axios.post(`${API_URL}/project_module/create`, formPayload, {
          headers: { "Content-Type": "application/json" },
        });
        fetchProject_Module(); // Fetch projects after creating a new one
        alert("Project created successfully!");
      }

      // Reset form data and close the modal after successful operation
      setFormData({});
      setLoading(false);
      onClose();
    } catch (error) {
      console.error("Error submitting project module:", error);
      setLoading(false);
      alert("Error while saving project module. Please try again.");
    }

    // setData(newState);
    setNewTaskContent(""); // Clear the input field
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} centered>
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
