import type { NextConfig } from "next";

type RemotePattern = {
  protocol?: "http" | "https";
  hostname: string;
  port?: string;
  pathname?: string;
};

const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;
const remotePatterns: RemotePattern[] = [
  {
    protocol: "http",
    hostname: "localhost",
    port: "3001",
    pathname: "/api/media/**",
  },
  {
    protocol: "https",
    hostname: "localhost",
    port: "3001",
    pathname: "/api/media/**",
  },
];
if (cmsUrl) {
  try {
    const u = new URL(cmsUrl);
    if (u.hostname !== "localhost" && u.hostname !== "127.0.0.1") {
      remotePatterns.push({
        protocol: u.protocol.replace(":", "") as "http" | "https",
        hostname: u.hostname,
        port: u.port || (u.protocol === "https:" ? "443" : "80"),
        pathname: "/api/media/**",
      });
    }
  } catch {
    // ignore invalid URL
  }
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["framer-motion", "swiper"],
  },
};

export default nextConfig;
