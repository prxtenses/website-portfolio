import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/website-portfolio",
  images: {
    unoptimized: true,
    qualities: [70, 75, 90],
  },
};

export default nextConfig;
