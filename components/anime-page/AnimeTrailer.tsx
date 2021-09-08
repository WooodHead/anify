import tw, { styled } from 'twin.macro'
import { Skeleton } from '@chakra-ui/react'

type AnimeTrailerProps = {
  isLoaded: boolean
  anime?: Anime | null
}

const AnimeTrailer = ({ isLoaded, anime }: AnimeTrailerProps) => {
  if (!anime?.trailer) return null

  return (
    <div>
      <SectionTitle>Trailer</SectionTitle>
      <TrailerVideo isLoaded={isLoaded}>
        {anime?.trailer ? (
          <iframe
            // prevent autoplay
            src={anime.trailer.replace('autoplay=1', 'autoplay=0')}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : null}
      </TrailerVideo>
    </div>
  )
}

export default AnimeTrailer

const SectionTitle = tw.h2`text-xl font-semibold mb-2`

const TrailerVideo = styled(Skeleton)`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
