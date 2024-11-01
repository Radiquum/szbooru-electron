import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone", // This line
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
