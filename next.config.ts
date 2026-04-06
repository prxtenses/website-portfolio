import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    qualities: [70, 75, 90],
  },
  compiler: {
    removeConsole: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "framer-motion", "@gsap/react"],
  },
};

export default nextConfig;
