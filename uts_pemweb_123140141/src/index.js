import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";

const akar = document.getElementById("root");

createRoot(akar).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
