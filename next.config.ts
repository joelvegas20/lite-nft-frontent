import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  nextRuntime: "nodejs",
  webpack: (config, { isServer, nextRuntime }) => {
    console.log("Next.js runtime:", nextRuntime); // Esto debería imprimir 'nodejs'
    if (isServer) {
      config.externals = [...(config.externals || []), "async_hooks"];
    }
    return config;
  },
};

export default nextConfig;