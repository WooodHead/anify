module.exports = {
  siteUrl: 'https://anify.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: ['https://anify.app/server-sitemap.xml'],
  },
}
