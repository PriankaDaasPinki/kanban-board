import React, { useState, useEffect } from "react";
// import axios from "axios";
import Board from "../Components/Board";

export default function Api() {
  const [data, setData] = useState({
    tasks: {},
    columns: {
      "column-1": { id: "column-1", title: "To Do", taskIds: [] },
      "column-2": { id: "column-2", title: "In Progress", taskIds: [] },
      "column-3": { id: "column-3", title: "Done", taskIds: [] },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  });

  // Fetch user data as task data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        const tasks = {};
        const taskIds = users.map((user) => {
          const taskId = `task-${user.id}`;
          tasks[taskId] = {
            id: taskId,
            title: `${user.name}`, // Setting the user name as task title
            content: `${user.email}, Phone: ${user.phone}`, // Setting email and phone as task description
            assignee: user.company.name, // Setting company name as assignee
          };
          return taskId;
        });

        const updatedColumns = {
          ...data.columns,
          "column-1": {
            ...data.columns["column-1"],
            taskIds: taskIds, // Place all tasks initially in the "To Do" column
          },
        };

        setData({ ...data, tasks: tasks, columns: updatedColumns });
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  console.log('data Data data = ' + data);

  return (
    <>
      <Board Data={data} />
    </>
  );
}
