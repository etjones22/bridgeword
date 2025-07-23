/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    // Ads and analytics scripts are loaded via script tags rather than Next.js images API
    unoptimized: true
  }
};

export default nextConfig;