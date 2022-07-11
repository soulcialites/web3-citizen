/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  // assetPrefix: '/web3-citizen/',
  // basePath: '/web3-citizen',
  // assetPrefix: './',
  // basePath: '',
  experimental: {
    esmExternals: true,
  },
  trailingSlash: true,
  poweredByHeader: false,
  ignoreBuildErrors: true,
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
});
