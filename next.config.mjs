/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverActions: false, // Disable if using Turbopack for debugging
  },
  images: {
    domains: [
      "plus.unsplash.com",
      "images.unsplash.com",
      "unsplash.com",
      "via.placeholder.com", // Add specific image domains here
    ],
  },
};

export default nextConfig;
