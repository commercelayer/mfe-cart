import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { visualizer } from "rollup-plugin-visualizer"
import { loadEnv, type PluginOption } from "vite"
import { defineConfig } from "vitest/config"

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
          manualChunks,
        },
      },
    },
    resolve: {
      alias: {
        "#styles": resolve(import.meta.dirname, "./src/styles"),
        "#components": resolve(import.meta.dirname, "./src/components"),
        "#hooks": resolve(import.meta.dirname, "./src/hooks"),
        "#assets": resolve(import.meta.dirname, "./src/assets"),
        "#utils": resolve(import.meta.dirname, "./src/utils"),
        "#specs": resolve(import.meta.dirname, "./specs"),
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
        filename: resolve(import.meta.dirname, "./build/stats.html"),
        open: true,
        title: "Bundle Stats",
      }),
  ].filter(Boolean)

  return plugins
}

// Rollup 5 (Vite 8) dropped the object form of `manualChunks`, so the same
// grouping is expressed as a matcher over the resolved module id.
const chunkGroups: Record<string, string[]> = {
  vendor: [
    "react",
    "react-dom",
    "react-helmet-async",
    "wouter",
    "react-gtm-module",
    "react-i18next",
  ],
  commercelayer: ["@commercelayer/sdk", "@commercelayer/react-components"],
}

function manualChunks(id: string): string | undefined {
  if (!id.includes("node_modules")) {
    return undefined
  }

  for (const [chunk, packages] of Object.entries(chunkGroups)) {
    if (packages.some((name) => id.includes(`node_modules/${name}/`))) {
      return chunk
    }
  }

  return undefined
}
