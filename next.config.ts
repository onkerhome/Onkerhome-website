import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Optimization re-enabled on the Vercel Pro plan (Hobby's quota broke
    // newly uploaded photos with 402 in Sept 2026).
    remotePatterns: [
      // Supabase Storage (admin-panel uploads)
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
