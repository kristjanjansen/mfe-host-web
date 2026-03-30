import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        react: resolve(__dirname, "vendor/react.js"),
        "react-dom-client": resolve(__dirname, "vendor/react-dom-client.js"),
        "react-jsx-runtime": resolve(__dirname, "vendor/react-jsx-runtime.js"),
        "tanstack-query": resolve(__dirname, "vendor/tanstack-query.js"),
        i18next: resolve(__dirname, "vendor/i18next.js"),
      },
      preserveEntrySignatures: "exports-only",
      output: {
        dir: resolve(__dirname, "public/vendor"),
        format: "es",
        entryFileNames: "[name].js",
      },
    },
    emptyOutDir: false,
  },
});
