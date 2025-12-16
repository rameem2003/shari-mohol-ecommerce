import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "shari-mohol-ecommerce-server.onrender.com",
      },
      {
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
