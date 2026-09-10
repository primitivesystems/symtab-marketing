import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  async redirects() {
    return [
      "/downloads",
      "/downloads/symtab.dmg",
      "/downloads/symtab.exe",
      "/downloads/symtab.AppImage",
    ].map((source) => ({ source, destination: "/download", permanent: false }))
  },
}

export default nextConfig
