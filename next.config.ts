import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Local `file:../apiuikit/packages/lib` — transpile the linked package.
  transpilePackages: ["apiuikit"],
  // Sibling package lives outside this app; enlarge tracing/Turbopack root
  // so resolution can follow into `../apiuikit` (required for file:/npm link).
  outputFileTracingRoot: path.join(__dirname, ".."),
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
