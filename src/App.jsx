// // src/App.js
// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./App.css";

// import initialData from "./Data/initial-data";

// function App() {
//   const [data, setData] = useState(initialData);

//   const onDragEnd = (result) => {
//     const { destination, source, draggableId } = result;

//     if (!destination) return;

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     const start = data.columns[source.droppableId];
//     const finish = data.columns[destination.droppableId];

//     if (start === finish) {
//       const newTaskIds = Array.from(start.taskIds);
//       newTaskIds.splice(source.index, 1);
//       newTaskIds.splice(destination.index, 0, draggableId);

//       const newColumn = {
//         ...start,
//         taskIds: newTaskIds,
//       };

//       const newState = {
//         ...data,
//         columns: {
//           ...data.columns,
//           [newColumn.id]: newColumn,
//         },
//       };

//       setData(newState);
//       return;
//     }

//     const startTaskIds = Array.from(start.taskIds);
//     startTaskIds.splice(source.index, 1);
//     const newStart = {
//       ...start,
//       taskIds: startTaskIds,
//     };

//     const finishTaskIds = Array.from(finish.taskIds);
//     finishTaskIds.splice(destination.index, 0, draggableId);
//     const newFinish = {
//       ...finish,
//       taskIds: finishTaskIds,
//     };

//     const newState = {
//       ...data,
//       columns: {
//         ...data.columns,
//         [newStart.id]: newStart,
//         [newFinish.id]: newFinish,
//       },
//     };

//     setData(newState);
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="board">
//         {data.columnOrder.map((columnId) => {
//           const column = data.columns[columnId];
//           const tasks = column.taskIds.map(
//             (taskId) => data.tasks[taskId]
//           );

//           return <Column key={column.id} column={column} tasks={tasks} />;
//         })}
//       </div>
//     </DragDropContext>
//   );
// }

// function Column({ column, tasks }) {
//   return (
//     <div className="column">
//       <h2>{column.title}</h2>
//       <Droppable droppableId={column.id}>
//         {(provided) => (
//           <div
//             className="task-list"
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//           >
//             {tasks.map((task, index) => (
//               <Task key={task.id} task={task} index={index} />
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// }

// function Task({ task, index }) {
//   return (
//     <Draggable draggableId={task.id} index={index}>
//       {(provided) => (
//         <div
//           className="task"
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//         >
//           {task.content}
//         </div>
//       )}
//     </Draggable>
//   );
// }

// export default App;


import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
