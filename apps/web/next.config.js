// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["server"],
  eslint: {
    dirs: ['pages', 'screens', 'packages', 'core', 'components'],
  },
};
