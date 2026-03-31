import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

async function bootstrap() {
  const [config, session] = await Promise.all([
    fetch("/config/ee.json").then((r) => r.json()),
    fetch(`${import.meta.env.MFE_API_URL}/api/v1/session`).then((r) =>
      r.json()
    ),
  ]);

  (window as any).__MFE_CONFIG__ = config;
  (window as any).__MFE_AUTH__ = session;
}

bootstrap().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
});
