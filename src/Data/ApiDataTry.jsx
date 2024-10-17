// // import React from "react";
// import React, { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// export default function ApiDataTry() {
//   const [data, setData] = useState({
//     tasks: {},
//     columns: {
//       "column-1": { id: "column-1", title: "To Do", taskIds: [] },
//       "column-2": { id: "column-2", title: "In Progress", taskIds: [] },
//       "column-3": { id: "column-3", title: "Done", taskIds: [] },
//     },
//     columnOrder: ["column-1", "column-2", "column-3"],
//   });

//   const [newTaskContent, setNewTaskContent] = useState("");

//   useEffect(() => {
//     fetch("https://thetestingworldapi.com/api/studentsDetails?all", {
//       mode: "no-cors" // Disables CORS checks (less secure)
//     })
//       .then((response) => response.json())
//       .then((fetchedStudents) => {
//         console.log("student1");
//         const tasks = {};
//         const taskIds = [];

//         fetchedStudents.data.forEach((student) => {
//           console.log("student");
//           console.log(student);
//           tasks[student.id] = {
//             id: student.id,
//             content: `${student.first_name} ${student.last_name}`,
//             assignee: student.assignee || "Unassigned",
//           };
//           taskIds.push(student.id);
//         });

//         const updatedColumns = {
//           ...data.columns,
//           "column-1": {
//             ...data.columns["column-1"],
//             taskIds: taskIds,
//           },
//         };

//         setData({ ...data, tasks: tasks, columns: updatedColumns });
//       })
//       .catch((error) => console.error("Error fetching students:", error));
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newTask = {
//       first_name: newTaskContent.split(" ")[0] || "First",
//       last_name: newTaskContent.split(" ")[1] || "Last",
//       assignee: "Unassigned",
//     };

//     fetch("https://thetestingworldapi.com/api/studentsDetails", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newTask),
//     })
//       .then((response) => response.json())
//       .then((createdStudent) => {
//         const newTaskId = createdStudent.id;
//         const updatedTasks = {
//           ...data.tasks,
//           [newTaskId]: {
//             id: newTaskId,
//             content: `${createdStudent.first_name} ${createdStudent.last_name}`,
//             assignee: createdStudent.assignee || "Unassigned",
//           },
//         };

//         const updatedColumn = {
//           ...data.columns["column-1"],
//           taskIds: [...data.columns["column-1"].taskIds, newTaskId],
//         };

//         const newState = {
//           ...data,
//           tasks: updatedTasks,
//           columns: {
//             ...data.columns,
//             [updatedColumn.id]: updatedColumn,
//           },
//         };

//         setData(newState);
//         setNewTaskContent("");
//       })
//       .catch((error) => console.error("Error creating task:", error));
//   };

//   const handleChangeAssignee = (taskId, newAssignee) => {
//     const updatedTask = { ...data.tasks[taskId], assignee: newAssignee };

//     fetch(`https://thetestingworldapi.com/api/studentsDetails/${taskId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ assignee: newAssignee }),
//     })
//       .then((response) => response.json())
//       .then(() => {
//         const updatedTasks = {
//           ...data.tasks,
//           [taskId]: updatedTask,
//         };

//         setData({ ...data, tasks: updatedTasks });
//       })
//       .catch((error) => console.error("Error updating task:", error));
//   };

//   console.log(data);
//   return (
//     <div>
//       {/* Your Kanban board with task components */}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={newTaskContent}
//           onChange={(e) => setNewTaskContent(e.target.value)}
//           placeholder="Enter new task"
//         />
//         <button type="submit">Add Task</button>
//       </form>
//     </div>
//   );
// }
