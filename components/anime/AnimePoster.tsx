import { forwardRef, ForwardedRef } from 'react'
import tw, { styled } from 'twin.macro'
import Image from 'next/image'

type AnimePosterProps = {
  mainImage: string
  title: string
  mainImageBlurred: string
  onClick?: () => void
  scale?: number
  priority?: boolean
  className?: string
}

const WrappedAnimePoster = forwardRef(function AnimePoster(
  {
    mainImage,
    title,
    mainImageBlurred,
    onClick,
    scale = 1,
    priority,
    className,
  }: AnimePosterProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <AnimeImage onClick={onClick} ref={ref} scale={scale} className={className}>
      <Image
        src={mainImage}
        width={225 * scale}
        height={350 * scale}
        layout="fixed"
        alt={`${title} poster.`}
        placeholder="blur"
        blurDataURL={mainImageBlurred}
        unoptimized
        priority={priority}
      />
    </AnimeImage>
  )
})

export default WrappedAnimePoster

const AnimeImage = styled.div<{ scale: number; className?: string }>`
  ${tw`rounded-lg shadow-lg dark:shadow-none overflow-hidden`}
  ${({ scale }) => `
    width: ${225 * scale}px;
    height: ${350 * scale}px;
  `}
  ${({ className }) => className}
`
