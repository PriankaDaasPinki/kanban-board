import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import "./CSS/index.css";
import App from "./App";
// import { store } from "./store";
import tasksStore from "./app/store";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={tasksStore}>
    <App />
  </Provider>

  // </React.StrictMode>
);


reportWebVitals();
