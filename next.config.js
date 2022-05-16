const { i18n } = require('./next-i18next.config');

const shouldAnalyzeBundles = process.env.ANALYZE_BUNDLE === "true"

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000",
  },
]

let nextConfig = {
   async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  poweredByHeader: false,
  webpack: (config) => {
    return config
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
  }
}

if (shouldAnalyzeBundles) {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  })
  nextConfig = withBundleAnalyzer(nextConfig)
}

module.exports = nextConfig