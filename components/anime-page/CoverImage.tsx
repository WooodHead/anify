import tw, { styled } from 'twin.macro'

type CoverImageProps = {
  colors: string[]
}

const CoverImage = ({ colors }: CoverImageProps) => {
  return <Container colors={colors} />
}

export default CoverImage

const Container = styled.div<{ colors: string[] }>`
  ${tw`relative h-80! md:h-52! overflow-hidden z-10 filter`}
  ${({ colors }) => `
     background-color: ${colors[0]}
  `}
`
