import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.figma.com"],
  },
  transpilePackages: ["@mattplays/mpds"],
};

export default nextConfig;
