const withLess = require("next-with-less");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false
}

module.exports = withLess({
    ...nextConfig,
    lessLoaderOptions: {
        /* ... */
    },
});