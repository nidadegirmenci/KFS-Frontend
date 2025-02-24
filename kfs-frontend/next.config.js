/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "yt3.googleusercontent.com",
      "fabrikbrands.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ],
  },
}

module.exports = nextConfig

