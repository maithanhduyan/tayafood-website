import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // output: "export", for static export, but it doesn't work with API routes
  trailingSlash: true,
};

export default nextConfig;
