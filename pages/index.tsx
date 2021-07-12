import { useQuery } from '@apollo/client'
import { SEARCH_ANIME } from 'gql'
import { Layout } from 'components/display'
import { DesktopAnimeList, MobileAnimeList } from 'components/anime-page'
import { CallToAction } from 'components/home'
import { Divider } from '@chakra-ui/react'
import tw, { styled } from 'twin.macro'

const Home = () => {
  const searchQuery = useQuery<{ searchAnime: Query['searchAnime'] }>(
    SEARCH_ANIME,
    {
      variables: {
        query: '',
        page: 0,
        hitsPerPage: 40,
      },
    },
  )

  return (
    <Layout
      seo={{
        title: 'Home - Anime Next App',
        description: `Cutting edge anime platform designed for the average viewer. Oh and it's also 100% open-source.`,
        image: '',
        url: '/',
      }}
      shouldFullyCollapse
    >
      <CallToAction />
      <SectionDiver id="home-divider" />
      <DesktopAnimeList searchQuery={searchQuery} />
      <MobileAnimeList searchQuery={searchQuery} />
    </Layout>
  )
}

export default Home

const SectionDiver = styled(Divider)`
  margin-top: 40px;
  ${tw`mb-4 md:mb-12`}
`
