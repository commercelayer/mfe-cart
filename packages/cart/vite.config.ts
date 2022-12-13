import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import { loadEnv, PluginOption } from "vite"
import { defineConfig } from "vitest/config"

import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const analyzeBundle = env.ANALYZE_BUNDLE === "true"
  const basePath =
    env.PUBLIC_PROJECT_PATH != null ? `/${env.PUBLIC_PROJECT_PATH}` : ""

  return {
    plugins: preparePlugins({ analyzeBundle }),
    envPrefix: "PUBLIC_",
    server: {
      port: 3000,
    },
    base: `${basePath}/`,
    build: {
      target: "esnext",
      outDir: "build",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: [
              "react",
              "react-dom",
              "react-helmet-async",
              "wouter",
              "react-gtm-module",
              "react-i18next",
            ],
            commercelayer: [
              "@commercelayer/sdk",
              "@commercelayer/react-components",
            ],
          },
        },
      },
    },
    resolve: {
      alias: {
        "#styles": resolve(__dirname, "./src/styles"),
        "#components": resolve(__dirname, "./src/components"),
        "#hooks": resolve(__dirname, "./src/hooks"),
        "#assets": resolve(__dirname, "./src/assets"),
        "#utils": resolve(__dirname, "./src/utils"),
        "#specs": resolve(__dirname, "./specs"),
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
    },
  }
})

function preparePlugins({ analyzeBundle }: { analyzeBundle: boolean }) {
  const plugins: PluginOption[] = [
    react(),
    analyzeBundle &&
      visualizer({
        filename: resolve(__dirname, "./build/stats.html"),
        open: true,
        title: "Bundle Stats",
      }),
  ].filter(Boolean)

  return plugins
}
