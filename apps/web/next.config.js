module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  async redirects() {
    return [{
      source: '/',
      destination: '/nights/d09e8648-ef97-4959-ae0c-fb12c4c82f9d',
      permanent: false,
    }]
  }
};
