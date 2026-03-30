import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import { mfes } from "./config/config";
import { MfeElement } from "./components/MfeElement";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}

const routeMfes = Object.values(mfes).filter((m) => m.route);

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Broadcast route changes to all MFEs
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("mfe:route-changed", {
        detail: { path: location.pathname },
      })
    );
  }, [location.pathname]);

  // Listen for navigation requests from MFEs
  useEffect(() => {
    const handler = (e: Event) => {
      const path = (e as CustomEvent<{ path: string }>).detail?.path;
      if (path) navigate(path);
    };
    window.addEventListener("mfe:navigate", handler);
    return () => window.removeEventListener("mfe:navigate", handler);
  }, [navigate]);

  return (
    <>
      <MfeElement mfe={mfes.layout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {routeMfes.map((r) => (
            <Route
              key={r.path}
              path={`${r.path}/*`}
              element={<MfeElement mfe={r} slot="content" />}
            />
          ))}
          <Route path="*" element={<div slot="content">Not found</div>} />
        </Routes>
      </MfeElement>
      <MfeElement mfe={mfes.cookiebot} />
    </>
  );
}
