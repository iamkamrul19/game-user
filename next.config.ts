import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    IP_API_KEY: process.env.IP_API_KEY,
  },
  // images: {
  //   domains: ["res.cloudinary.com", "example.com"],
  // },
  images: {
    domains: ["res.cloudinary.com", "example.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all domains (risky)
      },
    ],
  },
};

export default nextConfig;
