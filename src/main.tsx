import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./reset.css";
import Notifications from "./components/notifications/Notifications.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <App />
    <Notifications time={3000} />
  </>
  // </StrictMode>
);
