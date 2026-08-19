import type { NextConfig } from "next";

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const nextConfig: NextConfig = {
  experimental: {
    cpus: 1,
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },
  compress: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/track.aspx',
        destination: '/track',
        permanent: true,
      },
      {
        source: '/trackaspx',
        destination: '/track',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
