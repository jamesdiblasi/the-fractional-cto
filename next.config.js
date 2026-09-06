/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-contained server for Azure App Service: `node server.js` from
  // .next/standalone is the whole deployable. The build script copies
  // .next/static and public/ in alongside it.
  output: 'standalone',
  images: { unoptimized: true },
  poweredByHeader: false,
};

module.exports = nextConfig;
