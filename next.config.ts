import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  devIndicators: false,
  allowedDevOrigins: ['kinetis.localhost'],
};

export default nextConfig;
