import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import { loadEnv, PluginOption } from "vite"
import { defineConfig } from "vitest/config"

import path from "path"

const makePlugins = (mode: string) => {
  // Access .env variables in vite.config
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""))
  const plugins: PluginOption[] = [
    // Allow Vite to work with React
    react(),
    // Visualize and analyze bundle
    process.env.ANALYZE_BUNDLE === "true" &&
      visualizer({
        filename: path.resolve(__dirname, "./build/stats.html"),
        open: true,
        title: "Bundle Stats",
      }),
  ].filter(Boolean)

  return plugins
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: makePlugins(mode),
    envPrefix: "PUBLIC_",
    build: {
      target: "esnext",
      outDir: "build",
    },
    resolve: {
      alias: {
        "#styles": path.resolve(__dirname, "./src/styles"),
        "#components": path.resolve(__dirname, "./src/components"),
        "#hooks": path.resolve(__dirname, "./src/hooks"),
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
  }
})
