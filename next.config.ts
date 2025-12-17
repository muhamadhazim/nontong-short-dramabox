import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "**.sansekai.my.id",
      },
      {
        protocol: "https",
        hostname: "img.dramaboxdb.com",
      },
    ],
  },
};

export default nextConfig;
