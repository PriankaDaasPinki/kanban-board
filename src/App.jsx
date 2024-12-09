// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./CSS/App.css";
// import Navbar from "./Components/Common/Header/Nav";
// import NavSecondary from "./Components/Common/Header/NavSecondery";
// import Board from "./Components/Board";
import ScrollUpButton from "./Components/Common/ScrollUpButton";
import RoutesAll from "./Routes/Route";

function App() {
  return (
    <>
      <div className="mainBody">
        <RoutesAll />
      </div>
      <ScrollUpButton />
    </>
  );
}

export default App;
