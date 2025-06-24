import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx;
import CosmicClassroom from "./components/CosmicClassroom.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CosmicClassroom />
  </StrictMode>
);
