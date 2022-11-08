import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: "PUBLIC_",
  build: {
    target: "esnext",
    outDir: "build",
  },
  resolve: {
    alias: {
      "#styles": path.resolve(__dirname, "./src/styles"),
      "#components": path.resolve(__dirname, "./src/components"),
      "#assets": path.resolve(__dirname, "./src/assets"),
      "#utils": path.resolve(__dirname, "./src/utils"),
      "#specs": path.resolve(__dirname, "./specs"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
})
