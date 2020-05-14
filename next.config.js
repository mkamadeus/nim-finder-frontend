module.exports = 
{
  exportTrailingSlash: true,
  exportPathMap: async function(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      '/': { page: '/' },
      '/help': { page: '/help' }
    };
  },
  // assetPrefix: './'
}