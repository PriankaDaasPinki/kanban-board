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
      "task-3": {
        id: "task-3",
        title: "Task 3",
        content: "Task 3 Description,Task 3 Description,Task 3 Description",
        assignee: "assignee Name",
      },
      "task-4": {
        id: "task-4",
        title: "Task 4",
        content: "Task 4 Description,Task 4 Description,Task 4 Description",
        assignee: "assignee Name",
      },
      "task-5": {
        id: "task-5",
        title: "Task 5",
        content: "Task 5 Description,Task 5 Description,Task 5 Description",
        assignee: "assignee Name",
      },
      "task-6": {
        id: "task-6",
        title: "Task 6",
        content: "Task 6 Description,Task 6 Description,Task 6 Description",
        assignee: "assignee Name",
      },
    },
    columns: {
      "column-1": {
        id: "column-1",
        title: "To Do",
        taskIds: ["task-1", "task-2", "task-3","task-4", "task-5", "task-6"],
      },
      "column-2": {
        id: "column-2",
        title: "In Progress",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "Done",
        taskIds: [],
      },
      "column-4": {
        id: "column-4",
        title: "Paused",
        taskIds: [],
      },
      "column-5": {
        id: "column-5",
        title: "Ongoing",
        taskIds: [],
      },
      "column-6": {
        id: "column-6",
        title: "Processing",
        taskIds: [],
      },
    },
    columnOrder: [
      "column-1",
      "column-2",
      "column-3",
      "column-4",
      "column-5",
      "column-6",
    ],
  };
  
  // Updated assignee options: Ram, Sam, and Madhu
  export const assigneeOptions = ["Ram", "Sam", "Madhu", "Unassigned"];
  
  export default initialData;