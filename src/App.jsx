// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ToastContainer } from "react-toastify";
import "./CSS/App.css";
import ScrollUpButton from "./Components/Common/ScrollUpButton";
import RoutesAll from "./Routes/Route";

function App() {
  return (
    <>
      <div className="mainBody">
        <div className="toastContainerApp"><ToastContainer /></div>
        <RoutesAll />
      </div>
      <ScrollUpButton />
    </>
  );
}

export default App;
