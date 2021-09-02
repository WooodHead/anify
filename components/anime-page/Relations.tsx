import { useMemo } from 'react'
import { isPresent } from 'utils'
import tw from 'twin.macro'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import PrimaryRelation from './PrimaryRelation'

SwiperCore.use([Navigation])

type RelationsProps = {
  anime?: Anime | null
}

const Relations = ({ anime }: RelationsProps) => {
  const relatedAnimes = useMemo<JSX.Element[]>(
    () => [
      ...(anime?.relations?.prequel.filter(isPresent).map((prequel) => (
        <SwiperSlide key={prequel.id}>
          <PrimaryRelation anime={prequel} label="Prequel" />
        </SwiperSlide>
      )) || []),
      ...(anime?.relations?.sequel.filter(isPresent).map((sequel) => (
        <SwiperSlide key={sequel.id}>
          <PrimaryRelation anime={sequel} label="Sequel" />
        </SwiperSlide>
      )) || []),
      ...(anime?.relations?.sideStory.filter(isPresent).map((sideStory) => (
        <SwiperSlide key={sideStory.id}>
          <PrimaryRelation anime={sideStory} label="Side Story" />
        </SwiperSlide>
      )) || []),
      ...(anime?.relations?.alternativeVersion
        .filter(isPresent)
        .map((alternativeVersion) => (
          <SwiperSlide key={alternativeVersion.id}>
            <PrimaryRelation
              anime={alternativeVersion}
              label="Alternative Version"
            />
          </SwiperSlide>
        )) || []),
      ...(anime?.relations?.alternativeSetting
        .filter(isPresent)
        .map((alternativeSetting) => (
          <SwiperSlide key={alternativeSetting.id}>
            <PrimaryRelation
              anime={alternativeSetting}
              label="Alternative Setting"
            />
          </SwiperSlide>
        )) || []),
      ...(anime?.relations?.spinOff.filter(isPresent).map((spinOff) => (
        <SwiperSlide key={spinOff.id}>
          <PrimaryRelation anime={spinOff} label="Spin-off" />
        </SwiperSlide>
      )) || []),
      ...(anime?.relations?.summary.filter(isPresent).map((summary) => (
        <SwiperSlide key={summary.id}>
          <PrimaryRelation anime={summary} label="Summary" />
        </SwiperSlide>
      )) || []),
      ...(anime?.relations?.other.filter(isPresent).map((other) => (
        <SwiperSlide key={other.id}>
          <PrimaryRelation anime={other} label="Other" />
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
        <Swiper slidesPerView={5.5} navigation>
          {relatedAnimes}
        </Swiper>
      </Container>
    </div>
  )
}

export default Relations

const Title = tw.h2`text-xl font-semibold mb-2`

const Container = tw.div`flex`