import { createRoot } from "react-dom/client";
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </BrowserRouter>
);