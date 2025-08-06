import React from "react";
import ReactDOM from "react-dom/client"; // Notice the '/client' here
import App from "./App";
import "./styles/app.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
