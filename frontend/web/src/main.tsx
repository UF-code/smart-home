import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { loadTheme } from "./utils/theme.ts";
import "./index.css";
import App from "./App.tsx";

loadTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
