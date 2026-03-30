import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

async function loadConfig() {
  const country = localStorage.getItem("configCountry") || "ee";
  const config = await fetch(`/config/${country}.json`).then((r) => r.json());
  const featureOverride = localStorage.getItem("configOverride");
  if (featureOverride) {
    config.features = { ...config.features, ...JSON.parse(featureOverride) };
  }
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
