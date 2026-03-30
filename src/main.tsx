import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

async function loadConfig() {
  const config = await fetch("/config/ee.json").then((r) => r.json());
  (window as any).__MFE_CONFIG__ = config;
}

loadConfig().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
});
