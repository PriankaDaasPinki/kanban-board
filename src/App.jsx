// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./CSS/App.css";
import Navbar from "./Components/Nav";
import Board from "./Components/Board";
import ScrollUpButton from "./Components/ScrollUpButton";
// import AddTaskModal from "./Components/AddTaskModal";
// import Column from "./Components/Column";
// import ApiDataTry from "./Data/ApiDataTry";
import Api from "./Data/apiData";

// import initialData from "./Data/initial-data";

function App() {
  return (
    <>
      <Navbar />
      {/* <div className="addTaskDiv">
        <AddTaskModal />
      </div> */}
      {/* <Api /> */}
      <Board />      
      <ScrollUpButton />
    </>
  );
}

export default App;
