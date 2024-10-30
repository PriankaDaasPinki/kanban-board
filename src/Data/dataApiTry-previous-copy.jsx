import React, { useState, useEffect } from "react";
// import axios from "axios";
import Board from "../Components/Board";

export default function ApiDataTry() {
  // const [data, setData] = useState({
  //   tasks: {},
  //   columns: {
  //     "column-1": { id: "column-1", title: "To Do", taskIds: [] },
  //     "column-2": { id: "column-2", title: "In Progress", taskIds: [] },
  //     "column-3": { id: "column-3", title: "Done", taskIds: [] },
  //   },
  //   columnOrder: [
  //     "column-1",
  //     "column-2",
  //     "column-3",
  //     "column-4",
  //     "column-5",
  //     "column-699",
  //   ],
  // });

  const initialData = {
    tasks: {
      "task-1": {
        id: "task-1",
        title: "Task 1",
        content: "Task 1 Description, Task 1 Description ,Task 1 Description.",
        assignee: "assignee Name",
      },
      "task-2": {
        id: "task-2",
        title: "Task 2",
        content: "Task 2 Description, Task 2 Description,Task 2 Description.",
        assignee: "assignee Name",
      },
    },
    columns: {
      "column-1": { id: "column-1", title: "To Do", taskIds: [] },
      "column-2": { id: "column-2", title: "In Progress", taskIds: [] },
      "column-3": { id: "column-3", title: "Done", taskIds: [] },
    },
    columnOrder: [
      "column-1",
      "column-2",
      "column-3",
      "column-4",
      "column-5",
      "column-699",
    ],
  };

  const [apiTaskData, setApiTaskData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((fatchedTaskData) => {
        // console.log(data);
        setApiTaskData(fatchedTaskData);
      });
  }, []);

  // console.log("Data from Task Value Add = " + apiTaskData);
  const [newTaskContent, setNewTaskContent] = useState(initialData);

  apiTaskData.map((apiTask) => {
    // var taskInfo = JSON.stringify(apiTask, null, 2)
    const newTaskId = `task-${Object.keys(initialData.tasks).length + 1}`;
    const newTask = {
      id: newTaskId,
      title: apiTask.name,
      content: apiTask.email,
      assignee: apiTask.username || "Unassigned",
    };
    const updatedTasks = {
      ...initialData.tasks,
      [newTaskId]: newTask,
    };

    const updatedColumn = {
      ...initialData.columns["column-1"],
      taskIds: [...initialData.columns["column-1"].taskIds, newTaskId],
    };

    const newState = {
      ...initialData,
      tasks: updatedTasks,
      columns: {
        ...initialData.columns,
        [updatedColumn.id]: updatedColumn,
      },
    };

    setNewTaskContent(newState);

    // var taskInfo = JSON.stringify(newTaskContent, null, 2)
    // console.log("apiTask " + taskInfo);
    return newTaskContent;
  });

  var taskInfo = JSON.stringify(newTaskContent, null, 2);
  console.log("apiTask " + taskInfo);
  // const [data, setData] = useState(initialData);

  // // const updateTask = (taskId, taskName, taskContent, assigneeName) => {
  // //   setData((prevData) => ({
  // //     ...prevData,
  // //     tasks: {
  // //       ...prevData.tasks,
  // //       [taskId]: {
  // //         id: taskId,
  // //         title: taskName,
  // //         content: taskContent,
  // //         assignee: assigneeName,
  // //       },
  // //     },
  // //   }));
  // // };

  // apiTaskData.map((taskData) => {
  //   var taskId = "task-" + taskData.id;
  //   var dataD = (prevData) => ({
  //     ...prevData,
  //     tasks: {
  //       ...prevData.tasks,
  //       [taskId]: {
  //         id: taskId,
  //         title: taskData.name,
  //         content: taskData.email,
  //         assignee: taskData.username || "Unassigned",
  //       },
  //     },
  //   }
  // );

  //   setData(dataD);

  //   console.log("data in "+data);

  //   // ["task-"+taskData.id] = {
  //   //   id: "task-"+taskData.id,
  //   //   title: taskData.name,
  //   //   content: taskData.email,
  //   //   assignee: taskData.username || "Unassigned",
  //   // };

  //   // taskIds.push(task.id);
  // });

  // apiTaskData.map(
  //   (taskData) =>
  //     // console.log('taskData' + taskData.email)
  //     // var taskId = "task-" + taskData.id,
  //     ({
  //       // const taskId = "task-" + taskData.id;
  //       // return updateTask("task-"+taskData.id, taskData.name,taskData.email, taskData.username || "Unassigned")
  //     })

  //   // updateTask(taskData.id, taskData.name,taskData.email, taskData.username ||
  //   // "Unassigned")
  // );

  // Example: Add a new task
  // const addTask = () => {
  //   updateTask("task-1", "This is a new task");
  // };

  // const [newTaskContent, setNewTaskContent] = useState("");

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/users")
  //     .then((response) => response.json())
  //     .then((fetchedTask) => {
  //       // console.clear();
  //       const newTasks = {};
  //       const taskIds = [];

  //       fetchedTask.map((task) => {
  //         var taskId = "task-" + task.id;

  //         newTasks = {
  //           id: taskId,
  //           title: task.name,
  //           content: task.email,
  //           assignee: task.username || "Unassigned",
  //         };

  //         taskIds.push(taskId);
  //       });

  //       console.log("blur" + newTasks.id);

  //       const updatedColumns = {
  //         ...data.columns,
  //         ...(data.columns["column-1"].taskIds = taskIds),
  //       };

  //       // console.log(newTasks);

  //       setData({ tasks: newTasks, columns: updatedColumns, ...data });
  //     })
  //     .catch((error) => console.error("Error fetching students:", error));
  // }, []);

  // console.log(data);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const newTask = {
  //     first_name: newTaskContent.split(" ")[0] || "First",
  //     last_name: newTaskContent.split(" ")[1] || "Last",
  //     assignee: "Unassigned",
  //   };

  //   fetch("https://thetestingworldapi.com/api/studentsDetails", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(newTask),
  //   }).then((response) => response.json())
  //     .then((createdStudent) => {
  //       const newTaskId = createdStudent.id;
  //       const updatedTasks = {
  //         ...data.tasks,
  //         [newTaskId]: {
  //           id: newTaskId,
  //           content: `${createdStudent.first_name} ${createdStudent.last_name}`,
  //           assignee: createdStudent.assignee || "Unassigned",
  //         },
  //       };

  //       const updatedColumn = {
  //         ...data.columns["column-1"],
  //         taskIds: [...data.columns["column-1"].taskIds, newTaskId],
  //       };

  //       const newState = {
  //         ...data,
  //         tasks: updatedTasks,
  //         columns: {
  //           ...data.columns,
  //           [updatedColumn.id]: updatedColumn,
  //         },
  //       };

  //       setData(newState);
  //       setNewTaskContent("");
  //     })
  //     .catch((error) => console.error("Error creating task:", error));
  // };

  // const handleChangeAssignee = (taskId, newAssignee) => {
  //   const updatedTask = { ...data.tasks[taskId], assignee: newAssignee };

  //   fetch(`https://thetestingworldapi.com/api/studentsDetails/${taskId}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ assignee: newAssignee }),
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       const updatedTasks = {
  //         ...data.tasks,
  //         [taskId]: updatedTask,
  //       };

  //       setData({ ...data, tasks: updatedTasks });
  //     })
  //     .catch((error) => console.error("Error updating task:", error));
  // };

  // console.log("Data from Api" + apiTaskData);

  return (
    <>
      <Board Data={apiTaskData} />
    </>
  );
}
