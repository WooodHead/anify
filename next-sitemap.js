module.exports = {
  siteUrl: 'https://anify.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: ['http://localhost:3000/server-sitemap.xml'],
  },
}
