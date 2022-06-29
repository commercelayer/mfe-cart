/* eslint-disable @typescript-eslint/no-var-requires */
const shouldAnalyzeBundles = process.env.ANALYZE_BUNDLE === "true"

let nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  webpack: (config) => {
    return config
  },
  // https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions#including-non-page-files-in-the-pages-directory
  pageExtensions: ["page.tsx"],
  // rewrite rules affect only development mode, since Next router will return 404 for paths that only exist in react-router
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
