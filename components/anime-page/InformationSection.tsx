import React from 'react'
import { format } from 'date-fns'
import tw, { styled } from 'twin.macro'
import { Tag, Skeleton } from '@chakra-ui/react'
import { HiStar } from 'react-icons/hi'
import { isPresent } from 'utils'
import _ from 'lodash'
import SeasonTag from './SeasonTag'
import StatisticCard from './StatisticCard'

type InformationSectionProps = {
  isLoaded: boolean
  anime?: Anime | null
}

const InformationSection = ({ isLoaded, anime }: InformationSectionProps) => {
  return (
    <Container>
      <MoreInformationColumn isLoaded={isLoaded}>
        {anime?.airedStart ? (
          <Label>
            <Field>Aired</Field>
            <Value>
              {format(new Date(anime.airedStart), 'PPP')}
              {anime.type !== 'movie'
                ? ` to ${
                    anime.airedEnd
                      ? format(new Date(anime.airedEnd), 'PPP')
                      : '-'
                  }`
                : null}
            </Value>
          </Label>
        ) : null}
        {anime?.season && anime?.airedStart ? (
          <Label>
            <Field>Premiered</Field>
            <TagList>
              <SeasonTag>
                {`${anime.season} ${format(new Date(anime.airedStart), 'yyy')}`}
              </SeasonTag>
            </TagList>
          </Label>
        ) : null}
        {anime?.episodes && anime?.type !== 'movie' ? (
          <Label>
            <Field>Episodes</Field>
            <Value>{anime.episodes}</Value>
          </Label>
        ) : null}
        {anime?.duration ? (
          <Label>
            <Field>Duration</Field>
            <Value>{anime.duration}</Value>
          </Label>
        ) : null}
        {anime?.sourceMaterialType ? (
          <Label>
            <Field>Source Material</Field>
            <Value>{anime.sourceMaterialType}</Value>
          </Label>
        ) : null}
        {anime?.licensors?.length ? (
          <Label>
            <Field>Licensors</Field>
            <TagList>
              {anime.licensors.filter(isPresent).map((licensor, index) => (
                <SpacedTag key={`licensor-${index}`} size="sm">
                  {_.truncate(licensor)}
                </SpacedTag>
              ))}
            </TagList>
          </Label>
        ) : null}
        {anime?.producers?.length ? (
          <Label>
            <Field>Producers</Field>
            <TagList>
              {anime.producers.filter(isPresent).map((producer, index) => (
                <SpacedTag key={`producer-${index}`} size="sm">
                  {_.truncate(producer)}
                </SpacedTag>
              ))}
            </TagList>
          </Label>
        ) : null}
        {anime?.studios?.length ? (
          <Label>
            <Field>Studios</Field>
            <TagList>
              {anime.studios.filter(isPresent).map((studio, index) => (
                <SpacedTag key={`studio-${index}`} size="sm">
                  {_.truncate(studio)}
                </SpacedTag>
              ))}
            </TagList>
          </Label>
        ) : null}

        {anime?.sources ? (
          <Label>
            <Field>References</Field>
            {anime.sources.filter(isPresent).map((source) => (
              <ValueLink href={source.url || undefined} key={source.name}>
                {source?.name}
              </ValueLink>
            ))}
          </Label>
        ) : null}
      </MoreInformationColumn>

      <StatisticGrid>
        <ScoreLoadingSkeleton isLoaded={isLoaded}>
          {anime?.score ? (
            <StatisticCard
              icon={<ScoreIcon />}
              label="Score"
              value={
                <>
                  {anime.score}
                  <ScoreTotal>/10</ScoreTotal>
                </>
              }
            />
          ) : null}
        </ScoreLoadingSkeleton>
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
      </StatisticGrid>
    </Container>
  )
}

export default InformationSection

const Container = tw.div`grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mt-8 gap-6`

const MoreInformationColumn = styled(Skeleton)<{ isLoaded: boolean }>`
  ${tw`bg-white dark:bg-gray-800 px-4 pt-4 pb-1 rounded shadow-lg dark:shadow-none order-2 md:order-1 h-auto`}
`

const StatisticGrid = styled.div`
  ${tw`flex flex-col col-span-1 md:col-span-2 xl:col-span-3 order-1 md:order-2 gap-6 h-auto`}
`

const Label = tw.div`leading-5 mb-3`

const Field = tw.p`font-bold text-sm`

const Value = tw.span`text-gray-500 dark:text-gray-400 text-sm`

const ValueLink = tw.a`color[var(--primary-color)] hover:color[var(--primary-color-hover)] dark:color[var(--primary-color-dark)] dark:hover:color[var(--primary-color-dark-hover)]  text-sm`

const TagList = tw.div`mt-1 -mb-1 leading-6`

const SpacedTag = tw(Tag)`mr-0.5`

const ScoreIcon = tw(HiStar)`mr-2 w-6 h-6`

const ScoreTotal = tw.span`text-base opacity-50`

const ScoreLoadingSkeleton = styled(Skeleton)<{ isLoaded: boolean }>`
  ${({ isLoaded }) => (isLoaded ? tw`h-auto` : `height: 80px;`)}
`

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
