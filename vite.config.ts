import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  envPrefix: ["MFE_", "VITE_"],
  server: {
    port: 3000,
  },
});
