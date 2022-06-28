/* eslint-disable @typescript-eslint/no-var-requires */
const shouldAnalyzeBundles = process.env.ANALYZE_BUNDLE === "true"

let nextConfig = {
  reactStrictMode: true,
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  poweredByHeader: false,
  webpack: (config) => {
    return config
  },
  pageExtensions: ["page.tsx"],
  async rewrites() {
    return [
      {
        source: "/:any*",
        destination: "/",
      },
    ]
  },
}

if (shouldAnalyzeBundles) {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  })
  nextConfig = withBundleAnalyzer(nextConfig)
}

module.exports = nextConfig
