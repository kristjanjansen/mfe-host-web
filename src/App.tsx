import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import { mfs } from "./config/config";
import { MfElement } from "./components/MfElement";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any;
    }
  }
}

const routeMfs = Object.values(mfs).filter((m) => m.route);

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
      <MfElement mf={mfs.layout}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          {routeMfs.map((r) => (
            <Route
              key={r.path}
              path={`${r.path}/*`}
              element={<MfElement mf={r} slot="content" />}
            />
          ))}
          <Route path="*" element={<div slot="content">Not found</div>} />
        </Routes>
      </MfElement>
      <MfElement mf={mfs.cookiebot} />
    </>
  );
}
