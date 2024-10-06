// src/App.js
// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Navbar from "./Components/Nav";
import Board from "./Components/Board";
// import Column from "./Components/Column";

// import initialData from "./Data/initial-data";

function App() {
  return (
    <>
      <Navbar />
      <Board />
    </>
  );
}

export default App;
