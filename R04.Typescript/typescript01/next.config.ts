import type { NextConfig } from "next";

/**
 * Next.js application configuration object.
 * Configures remote image domains for GitHub user avatars and package import optimizations.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "*.gravatar.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "next-themes", "zod", "clsx"],
  },
};

export default nextConfig;
