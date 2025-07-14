/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.vercel.app', '*.v0.dev']
    }
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.com', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  env: {
    CUSTOM_KEY: 'bookmyclinic',
  },
}

export default nextConfig
