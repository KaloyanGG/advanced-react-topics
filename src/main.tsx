import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./reset.css";
import Notifications from "./components/notifications/Notifications.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
    <Notifications duration={3000} />
  </Provider>
  // </StrictMode>
);
