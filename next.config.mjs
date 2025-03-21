/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdn-images-1.medium.com'],
  },
  transpilePackages: ['@mui/material', '@mui/system'],
};

export default nextConfig;
