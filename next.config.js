/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-contained server for Azure App Service: `node server.js` from
  // .next/standalone is the whole deployable. The build script copies
  // .next/static and public/ in alongside it.
  output: 'standalone',
  images: { unoptimized: true },
  poweredByHeader: false,
  // Leave the Azure SDK as a plain Node dependency rather than bundling it;
  // the standalone output traces and copies it.
  experimental: { serverComponentsExternalPackages: ['@azure/identity'] },
};

module.exports = nextConfig;
