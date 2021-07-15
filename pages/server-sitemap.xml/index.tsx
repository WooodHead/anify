import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { DynamoDB } from 'services/dynamodb'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const dynamo = new DynamoDB()

  const animes = await dynamo.getAllAnime({
    first: null,
    skip: null,
    last: null,
  })

  const fields = animes.map((anime) => ({
    loc: `https://anify.app/anime/${anime.slug}`,
    lastmod: new Date().toISOString(),
  }))

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default () => {}
