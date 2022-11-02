/** @type {import('next').NextConfig} */
const withVideos = require('next-videos')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ...withVideos()
}

module.exports = nextConfig
