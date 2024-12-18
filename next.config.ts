// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RAJAONGKIR_API_KEY: process.env.RAJAONGKIR_API_KEY
  }
}

module.exports = nextConfig

// .eslintrc.json
