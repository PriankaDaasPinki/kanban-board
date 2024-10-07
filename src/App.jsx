// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./CSS/App.css";
import Navbar from "./Components/Nav";
import Board from "./Components/Board";
import AddTaskModal from "./Components/AddTaskModal";
// import Column from "./Components/Column";

// import initialData from "./Data/initial-data";

function App() {
  return (
    <>
      <Navbar />
      <div className="addTaskDiv">
        <AddTaskModal />
      </div>
      <Board />
    </>
  );
}

export default App;
