import type { NextConfig } from "next";

const baseUrl = process.env.API_BASE_URL || "http://localhost:5000"

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${baseUrl}/api/:path*`
      }
    ]
  }  
};

export default nextConfig;
