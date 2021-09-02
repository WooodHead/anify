import tw from 'twin.macro'
import { AnimePoster } from 'components/anime'
import Link from 'next/link'

type PrimaryRelationProps = {
  anime: Anime
  label: string
}

const PrimaryRelation = ({ anime, label }: PrimaryRelationProps) => {
  return (
    <Link
      key={anime.slug}
      href={`/anime/${anime.shortId}/${anime.slug}`}
      passHref
    >
      <Container>
        <AnimePoster
          title={anime.englishTitle || anime.title || ''}
          mainImage={anime.mainImage || ''}
          mainImageBlurred={anime.mainImageBlurred || ''}
          scale={0.6}
          priority
          overlay={<Label>{label}</Label>}
        />
      </Container>
    </Link>
  )
}

export default PrimaryRelation

const Container = tw.a`block relative w-min`

const Label = tw.div`text-center p-2 text-sm font-semibold bg-gray-900 bg-opacity-90! text-white dark:text-gray-900 dark:bg-white`
