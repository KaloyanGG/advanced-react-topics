import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./reset.css";
import Notificator from "./components/notificator/Notificator.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <App />
    <Notificator time={3000} />
  </>
  // </StrictMode>
);
