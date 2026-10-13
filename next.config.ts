import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  async rewrites() {
    const configuredOrigin = process.env.DASHAIN_CARDS_ORIGIN;
    if (!configuredOrigin) return [];
    const url = new URL(configuredOrigin);
    if (
      url.protocol !== "https:" ||
      url.username || url.password || url.search || url.hash ||
      url.pathname !== "/"
    ) throw new Error("DASHAIN_CARDS_ORIGIN must be an HTTPS origin without a path or credentials.");
    return {
      beforeFiles: [
        {
          source: "/dashaincards/:path*",
          destination: `${url.origin}/dashaincards/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
