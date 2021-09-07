import { useMemo } from 'react'
import { isPresent } from 'utils'
import tw from 'twin.macro'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import AnimeRelation from './AnimeRelation'

SwiperCore.use([Navigation])

type RelatedAnimeProps = {
  anime?: Anime | null
}

const RelatedAnime = ({ anime }: RelatedAnimeProps) => {
  const relatedAnimes = useMemo<JSX.Element[]>(
    () => [
      ...(anime?.relations?.prequel.filter(isPresent).map((prequel) => (
        <SwiperSlide key={prequel.id}>
          <AnimeRelation anime={prequel} label="Prequel" />
        </SwiperSlide>
      )) || []),
      ...(anime?.relations?.sequel.filter(isPresent).map((sequel) => (
        <SwiperSlide key={sequel.id}>
          <AnimeRelation anime={sequel} label="Sequel" />
        </SwiperSlide>
      )) || []),
      ...(anime?.relations?.sideStory.filter(isPresent).map((sideStory) => (
        <SwiperSlide key={sideStory.id}>
          <AnimeRelation anime={sideStory} label="Side Story" />
        </SwiperSlide>
      )) || []),
      ...(anime?.relations?.alternativeVersion
        .filter(isPresent)
        .map((alternativeVersion) => (
          <SwiperSlide key={alternativeVersion.id}>
            <AnimeRelation
              anime={alternativeVersion}
              label="Alternative Version"
            />
          </SwiperSlide>
        )) || []),
      ...(anime?.relations?.alternativeSetting
        .filter(isPresent)
        .map((alternativeSetting) => (
          <SwiperSlide key={alternativeSetting.id}>
            <AnimeRelation
              anime={alternativeSetting}
              label="Alternative Setting"
            />
          </SwiperSlide>
        )) || []),
      ...(anime?.relations?.spinOff.filter(isPresent).map((spinOff) => (
        <SwiperSlide key={spinOff.id}>
          <AnimeRelation anime={spinOff} label="Spin-off" />
        </SwiperSlide>
      )) || []),
      ...(anime?.relations?.summary.filter(isPresent).map((summary) => (
        <SwiperSlide key={summary.id}>
          <AnimeRelation anime={summary} label="Summary" />
        </SwiperSlide>
      )) || []),
      ...(anime?.relations?.other.filter(isPresent).map((other) => (
        <SwiperSlide key={other.id}>
          <AnimeRelation anime={other} label="Other" />
        </SwiperSlide>
      )) || []),
    ],
    [anime],
  )

  if (!relatedAnimes.length) return null

  return (
    <div>
      <Title>Related Anime</Title>
      <Container>
        <Swiper slidesPerView="auto" spaceBetween={10} navigation>
          {relatedAnimes}
        </Swiper>
      </Container>
    </div>
  )
}

export default RelatedAnime

const Title = tw.h2`text-xl font-semibold mb-2`

const Container = tw.div`flex`
