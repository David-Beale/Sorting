import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Styling from "./Styling/Styling";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Styling>
      <App />
    </Styling>
  </React.StrictMode>,
  document.getElementById("root")
);
