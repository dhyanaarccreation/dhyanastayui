import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  turbopack: {
    // Pin the workspace root so stray lockfiles in parent folders
    // can't hijack Next's root auto-detection.
    root: path.join(__dirname),
  },
};

export default nextConfig;
