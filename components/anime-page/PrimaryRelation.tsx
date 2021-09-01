import tw from 'twin.macro'
import { AnimePoster } from 'components/anime'

type PrimaryRelationProps = {
  anime: Anime
  label: string
}

const PrimaryRelation = ({ anime, label }: PrimaryRelationProps) => {
  return (
    <Container>
      <AnimePoster
        title={anime.englishTitle || anime.title || ''}
        mainImage={anime.mainImage || ''}
        mainImageBlurred={anime.mainImageBlurred || ''}
        scale={0.6}
      />
      <Label>{label}</Label>
    </Container>
  )
}

export default PrimaryRelation

const Container = tw.div`relative inline-block overflow-hidden`

const Label = tw.div`absolute bottom-0 left-0 w-full text-center p-2 text-sm bg-gray-900 bg-opacity-90 text-white`
