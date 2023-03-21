/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "vitest.setup.ts",
    include: ["src/**/*.spec.{ts,tsx}"],
    coverage: {
      provider: "istanbul",
      include: ["src"],
      exclude: ["**/*.spec.{ts,tsx}"],
    },
  },
});
