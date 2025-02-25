// /* eslint-disable */
import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { MdOutlineAddTask } from "react-icons/md";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

import "../../CSS/boardStyle.css";
import Column from "./Column";
import { assigneeOptions } from "../../Data/initial-data";
import PageHeaderNav from "../Common/Header/PageHeaderNav";
import { API_URL } from "../Authentication/api";

export default function Board() {
  const [data, setData] = useState({
    tasks: {},
    columns: {
      "To Do": { id: "To Do", title: "To Do", taskIds: [] },
      "In Progress": { id: "In Progress", title: "In Progress", taskIds: [] },
      Paused: { id: "Paused", title: "Paused", taskIds: [] },
      Completed: { id: "Completed", title: "Completed", taskIds: [] },
    },
    columnOrder: ["To Do", "In Progress", "Paused", "Completed"],
    assigneeOptions: ["Ram", "Sam", "Madhu", "Unassigned"],
  });
  // const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const location = useLocation();
  const module_id = location.state?.module_id; // Access the passed value

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const tasks_Url = `/tasks/${module_id}`;

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const {
        data: { tasks: res },
      } = await axios.get(API_URL + tasks_Url);
      const tasks = res.reduce((acc, item) => {
        acc[`task-${item.task_id}`] = {
          id: `task-${item.task_id}`,
          title: item.task_name,
          content: item.description,
          assignee: "Unassigned",
        };
        return acc;
      }, {});

      const updatedColumns = { ...data.columns };
      res.forEach(({ stage, task_id }) => {
        const columnKey =
          stage === "to do"
            ? "To Do"
            : stage === "in progress"
            ? "In Progress"
            : stage;
        if (updatedColumns[columnKey]) {
          updatedColumns[columnKey].taskIds.push(`task-${task_id}`);
        }
      });

      setData({ ...data, tasks, columns: updatedColumns });
    } catch (err) {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch data when the component mounts
    // eslint-disable-next-line
  }, []);

  //Fetch user data as task data
  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((users) => {
  //       // const tasks = {};
  //       const taskIds = users.map((user) => {
  //         const taskId = `task-${user.id}`;
  //         tasks[taskId] = {
  //           id: taskId,
  //           title: user.company.name, // Setting the user name as task title
  //           content: user.email, // Setting email and phone as task description
  //           assignee: user.name, // Setting company name as assignee  assignee: `hello ${user.name}`
  //         };
  //         return taskId;
  //       });

  //       const updatedColumns = {
  //         ...data.columns,
  //         "To Do": {
  //           ...data.columns["To Do"],
  //           taskIds: taskIds, // Place all tasks initially in the "To Do" column
  //         },
  //       };

  //       setData({ ...data, tasks: tasks, columns: updatedColumns });
  //     })
  //     .catch((error) => console.error("Error fetching users:", error));
  //   // eslint-disable-next-line
  // }, []);

  //fetch data End

  const handleDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      setData({
        ...data,
        columns: {
          ...data.columns,
          [start.id]: { ...start, taskIds: newTaskIds },
        },
      });
      // const newColumn = {
      //   ...start,
      //   taskIds: newTaskIds,
      // };

      // const newState = {
      //   ...data,
      //   columns: {
      //     ...data.columns,
      //     [newColumn.id]: newColumn,
      //   },
      // };

      // setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    // const newStart = {
    //   ...start,
    //   taskIds: startTaskIds,
    // };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    // const newFinish = {
    //   ...finish,
    //   taskIds: finishTaskIds,
    // };

    // const newState = {
    //   ...data,
    //   columns: {
    //     ...data.columns,
    //     [newStart.id]: newStart,
    //     [newFinish.id]: newFinish,
    //   },
    // };

    // setData(newState);

    setData({
      ...data,
      columns: {
        ...data.columns,
        [start.id]: { ...start, taskIds: startTaskIds },
        [finish.id]: { ...finish, taskIds: finishTaskIds },
      },
    });
  };

  //Add task start here
  const [newTaskTitle, setNewTaskTitle] = useState(""); // state for the form input
  const [newTaskContent, setNewTaskContent] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //redux toolkit test
    // const task = {
    //   id: uuidv4(),
    //   title: newTaskTitle,
    //   completed: newTaskContent,
    // };
    // dispatch(addTask(task));

    // Create a new task ID and new task object
    // const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    // const newTask = {
    //   id: newTaskId,
    //   title: newTaskTitle,
    //   content: newTaskContent,
    //   date: newTaskDate || "",
    //   assignee: newTaskAssignee || "Unassigned",
    // };

    // Update the tasks object and add the task to the "To Do" column
    // const updatedTasks = {
    //   ...data.tasks,
    //   [newTaskId]: newTask,
    // };

    // const updatedColumn = {
    //   ...data.columns["To Do"],
    //   taskIds: [...data.columns["To Do"].taskIds, newTaskId],
    // };

    // const newState = {
    //   ...data,
    //   tasks: updatedTasks,
    //   columns: {
    //     ...data.columns,
    //     [updatedColumn.id]: updatedColumn,
    //   },
    // };

    // setLoading(true);
    // // Simulate an API call
    // setTimeout(() => {
    //   console.log("Saved task");
    //   setLoading(false);
    //   setShow(false);
    // }, 300);

    // setData(newState);
    setNewTaskTitle(""); // Clear the input field
    setNewTaskContent(""); // Clear the input field
    setNewTaskDate("");
    setNewTaskAssignee("");
  };

  // Handle task edit start
  const [isEditing, setIsEditing] = useState(null); // To track the task being edited
  const [editTaskTitle, setEditTaskTitle] = useState(""); // For task title editing
  const [editTaskContent, setEditTaskContent] = useState(""); // For task content editing
  const [editTaskAssignee, setEditTaskAssignee] = useState("");

  const handleEditStart = (
    taskId,
    currentTitle,
    currentContent,
    currentAssignee
  ) => {
    setIsEditing(taskId); // Set the task being edited
    setEditTaskTitle(currentTitle); // Populate the input with current task title
    setEditTaskContent(currentContent); // Populate the input with current task content
    setEditTaskAssignee(currentAssignee); // Populate the input with current task assignee
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // const UpdatedTask = {
    //   id: isEditing,
    //   title: editTaskTitle,
    //   completed: editTaskContent,
    // };
    // dispatch(updateTask(UpdatedTask));

    const updatedTasks = {
      ...data?.tasks,
      [isEditing]: {
        ...data.tasks[isEditing],
        title: editTaskTitle,
        content: editTaskContent,
        assignee: editTaskAssignee,
      }, // Update the content of the task being edited
    };

    const newState = {
      ...data,
      tasks: updatedTasks,
    };

    setLoading(true);
    setTimeout(() => {
      console.log("Updated task");
      setLoading(false);
      setShow(false);
    }, 300);

    setData(newState);
    setIsEditing(null); // Close the edit mode
    setEditTaskTitle(""); // Clear the edit field
    setEditTaskContent(""); // Clear the edit field
    setEditTaskAssignee(""); // Clear the edit field
  };

  // Task Delete
  const [taskToDelete, setTaskToDelete] = useState(null); // Store task to delete
  const [showDeleteWarning, setShowDeleteWarning] = useState(false); // Track delete warning visibility
  const [showDeleteWarningAfter, setShowDeleteWarningAfter] = useState(false); // Track delete warning visibility

  // Show delete warning before deleting
  const handleDeleteTaskWarning = (taskId, columnId) => {
    setTaskToDelete({ taskId, columnId });
    setShowDeleteWarning(true); // Show warning dialog
  };

  // Confirm and proceed with delete
  const handleConfirmDelete = () => {
    const { taskId, columnId } = taskToDelete;

    const updatedTasks = { ...data.tasks };
    delete updatedTasks[taskId];

    const updatedColumn = {
      ...data.columns[columnId],
      taskIds: data.columns[columnId].taskIds.filter((id) => id !== taskId),
    };

    const newState = {
      ...data,
      tasks: updatedTasks,
      columns: {
        ...data.columns,
        [updatedColumn.id]: updatedColumn,
      },
    };

    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      console.log("Deleted task task");
      setLoading(false);
      setShow(false);
    }, 300);

    setData(newState);
    setShowDeleteWarning(false);
    setTaskToDelete(null); // Clear the task to delete
    setShowDeleteWarningAfter(true);
    setTimeout(() => {
      setShowDeleteWarningAfter(false);
    }, 6000);
    <test />;
  };

  // Cancel delete operation
  const handleCancelDelete = () => {
    setShowDeleteWarning(false);
    setTaskToDelete(null); // Reset taskToDelete when canceling
  };

  const { name } = useParams();

  const breadcrumbItems = [
    // { label: <FaHome className="nav-icon" />, link: "/" },
    { label: "Projects", link: "/project-list" },
    {
      label: "Modules",
      link: {
        pathname: "/project-module/" + location?.state?.projectName,
        state: { id: location?.state?.project_id }, // Ensure project_id exists
      },
    },
    { label: "Tasks", link: "#" },
  ];

  return (
    <>
      <PageHeaderNav
        pageTitle={location?.state?.projectName}
        subTitle={name}
        breadcrumbItems={breadcrumbItems}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="boardStyle">
          <div className="addTaskDiv">
            <Button variant="primary" onClick={handleShow}>
              <MdOutlineAddTask className="addTaskIconApp" />
            </Button>
          </div>

          {loading && (
            <div className="p-5 mt-5">
              <h1>Loading......</h1>
            </div>
          )}
          {error && (
            <div className="p-5 mt-5">
              <h1>{error}</h1>
            </div>
          )}

          <div className="d-flex flex-column columnBoard">
            {/* <h2>All Task Of Your Project's Module</h2> */}
            <div className="taskColumnBoard">
              {data.columnOrder.map((columnId) => (
                <Column
                  key={columnId}
                  column={data.columns[columnId]}
                  tasks={data.columns[columnId].taskIds.map(
                    (taskId) => data.tasks[taskId]
                  )}
                  onEdit={handleEditStart}
                  onDelete={handleDeleteTaskWarning}
                />
              ))}

              {/* {data?.columnOrder?.map((columnId) => {
                const column = data?.columns[columnId];
                const tasks = column?.taskIds?.map(
                  (taskId) => data?.tasks[taskId]
                );

                console.log("tasks in board before ", tasks);

                return (
                  <Column
                    key={column?.id}
                    column={column}
                    tasks={tasks}
                    onEdit={handleEditStart}
                    onDelete={handleDeleteTaskWarning}
                  />
                );
              })} */}
            </div>
          </div>
        </div>
      </DragDropContext>

      {isEditing && (
        <Modal show="true">
          <div className="edit-form">
            <form onSubmit={handleEditSubmit}>
              <Modal.Header>
                <Modal.Title>Edit Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Named Your Task"
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Task Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Describe Your Task Here"
                    value={editTaskContent}
                    onChange={(e) => setEditTaskContent(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Assignee</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setEditTaskAssignee(e.target.value)}
                  >
                    <option value={editTaskAssignee}>{editTaskAssignee}</option>
                    {assigneeOptions.map((assignee) => (
                      <option value={assignee}>{assignee}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsEditing(null)}>
                  Close
                </Button>
                <Button type="submit" variant="danger" disabled={loading}>
                  {loading ? "Update Task..." : "Update Task"}
                </Button>
              </Modal.Footer>
            </form>
          </div>
        </Modal>
      )}

      {showDeleteWarning && (
        <Modal className="deleteWarning" show="true">
          <Modal.Header>
            <Modal.Title>Delete Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are you sure you want to delete this task?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="danger"
              onClick={handleConfirmDelete}
            >
              Yes, Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showDeleteWarningAfter && (
        <Alert
          key="success"
          variant="success"
          className="d-flex justify-content-evenly position-absolute alartDiv"
        >
          The task is deleted
        </Alert>
      )}

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Named Your Task"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Describe Your Task Here"
                value={newTaskContent}
                onChange={(e) => setNewTaskContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newTaskDate}
                onChange={(e) => setNewTaskDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assignee</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name of Assignee"
                value={newTaskAssignee}
                onChange={(e) => setNewTaskAssignee(e.target.value)}
              />
              <Form.Text className="text-muted">
                Who is assigned for the task
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="danger" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
