import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./global.css";

const root = document.getElementById("root");
if (root) {
  ReactDOM.render(<App />, root);
}