// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./CSS/App.css";
import Navbar from "./Components/Nav";
import Board from "./Components/Board";
import ScrollUpButton from "./Components/ScrollUpButton";

function App() {
  return (
    <>
      <Navbar />
      <Board />      
      <ScrollUpButton />
    </>
  );
}

export default App;
