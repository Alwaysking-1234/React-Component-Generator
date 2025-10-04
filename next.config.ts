import type { NextConfig } from "next";

// Optional base path for Project Pages (https://<user>.github.io/<repo>)
// Set via env: NEXT_PUBLIC_BASE_PATH="/<repo>"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Generate a static export for GitHub Pages
  output: "export",

  // Apply basePath only when provided (for Project Pages). For User/Org Pages, leave empty.
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),

  // If you use next/image, set unoptimized for static export.
  images: { unoptimized: true },
};

export default nextConfig;
