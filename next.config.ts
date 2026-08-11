import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const publicAssetBase = isGitHubPages ? "." : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: "",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: publicAssetBase,
  },
};

export default nextConfig;
