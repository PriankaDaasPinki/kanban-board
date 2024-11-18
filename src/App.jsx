// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./CSS/App.css";
import Navbar from "./Components/Nav";
// import Board from "./Components/Board";
import ScrollUpButton from "./Components/ScrollUpButton";
import RoutesAll from "./Routes/Route";

function App() {
  return (
    <>
      <Navbar />
      {/* <Board /> */}
      <RoutesAll />      
      <ScrollUpButton />
    </>
  );
}

export default App;
