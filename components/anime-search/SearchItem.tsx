import Link from 'next/link'
import tw, { styled } from 'twin.macro'
import { AnimePoster } from 'components/anime'
import { isPresent } from 'utils'
import { TypeBadge, StatusBadge, GenreTag } from 'components/anime'

type SearchItemProps = {
  anime: Anime
}

const SearchItem = ({ anime }: SearchItemProps) => {
  if (!isPresent(anime.mainImage) || !isPresent(anime.mainImageBlurred))
    return null

  return (
    <Link
      key={anime.slug}
      href={`/anime/${anime.shortId}/${anime.slug}`}
      passHref
    >
      <Container>
        <Absolute>
          <AnimePoster
            title={anime.englishTitle || anime.title || ''}
            mainImage={anime.mainImage}
            mainImageBlurred={anime.mainImageBlurred}
            scale={0.43}
            priority
          />
        </Absolute>

        <CoverContainer>
          <CoverBlurContainer>
            <CoverBlur>
              <AnimePoster
                title={anime.englishTitle || anime.title || ''}
                mainImage={anime.mainImage}
                mainImageBlurred={anime.mainImageBlurred}
                priority
              />
            </CoverBlur>
          </CoverBlurContainer>
        </CoverContainer>
        <Content>
          <div>
            <Title>{anime.englishTitle || anime.title || ''}</Title>
            {anime?.type ? <TypeBadge type={anime.type} /> : null}
            &nbsp;
            {anime?.status ? <StatusBadge status={anime.status} /> : null}
          </div>
        </Content>
      </Container>
    </Link>
  )
}

export default SearchItem

const Container = tw.div`relative overflow-hidden rounded-lg cursor-pointer transform-gpu hover:scale-105 transition-transform`

const Absolute = tw.div`absolute z-10 left-8 top-4`

const Title = tw.h2`text-xl font-semibold leading-5`

const Content = tw.div`flex items-center p-8 pt-0 pl-36 h-36 bg-white dark:bg-gray-900`

const CoverContainer = tw.div`dark:pt-9 h-10 bg-gray-900`

const CoverBlurContainer = tw.div`h-10 dark:h-1 overflow-hidden`

const CoverBlur = styled.div`
  ${tw`flex items-center justify-center h-80! md:h-52! min-h-0! m-0! filter blur-3xl w-full`}

  div {
    width: 150% !important;
    height: 400% !important;
    margin-top: -100% !important;
    ${tw`flex-shrink-0`}
  }
`
