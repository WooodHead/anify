import React, { useState, useEffect } from 'react'
import tw, { styled } from 'twin.macro'
import { Divider } from '@chakra-ui/react'
import { FaGithub, FaDiscord, FaCoffee, FaHeart } from 'react-icons/fa'
import Link from 'next/link'
import Logo from './Logo'

const Footer = () => {
  const [mounted, setMounted] = useState(typeof document !== 'undefined')

  useEffect(() => setMounted(true), [])

  return (
    <Container>
      <Content>
        <Grid>
          <InfoSection>
            <Logo mounted={mounted} />
            <p>
              Anify is a cutting edge anime platform designed for the average
              viewer. Oh and it&apos;s also 100% open-source.
            </p>
            <SocialIcons>
              <Link href="https://github.com/anify-app" passHref>
                <GithubIcon />
              </Link>
              <Link href="https://discord.gg/7yJ3xFMmxd" passHref>
                <DiscordIcon />
              </Link>
            </SocialIcons>
          </InfoSection>
          <LinkSection>
            <LinkSectionHeader>Navigation</LinkSectionHeader>
            <Link href="/" passHref>
              <NavigationLink>Home</NavigationLink>
            </Link>
            <Link href="/anime" passHref>
              <NavigationLink>Anime</NavigationLink>
            </Link>
          </LinkSection>
        </Grid>
        <SectionDivider />
        <BottomRow>
          <p>
            Made by the{' '}
            <Link href="https://github.com/orgs/anify-app/people" passHref>
              <TeamLink>Anify team</TeamLink>
            </Link>{' '}
            with <CoffeeIcon /> and <HeartIcon />.
          </p>
          <p>
            <Bold>20,000+</Bold> animes collected.
          </p>
        </BottomRow>
      </Content>
    </Container>
  )
}

export default Footer

const Container = styled.footer`
  ${tw`w-full bg-white dark:bg-black pb-12 pt-10 md:pt-12 xl:pt-16 px-8 xl:px-20 mt-8 text-sm`}
  box-shadow: 0 0px 20px 0 rgba(0,0,0,0.05);
`

const Content = tw.div`max-w-screen-2xl m-auto`

const Grid = tw.div`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-24`

const InfoSection = tw.div`flex flex-col gap-6`

const SocialIcons = tw.div`flex gap-3`

const TeamLink = tw.a`text-black dark:text-white font-semibold hover:underline`

const CoffeeIcon = tw(FaCoffee)`inline`

const HeartIcon = tw(FaHeart)`inline`

const GithubIcon = tw(
  FaGithub,
)`text-lg text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer`

const DiscordIcon = tw(
  FaDiscord,
)`text-lg text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer`

const BottomRow = tw.div`flex justify-between flex-col md:flex-row gap-4 text-gray-600 dark:text-gray-400`

const Bold = tw.span`font-semibold text-black dark:text-white`

const LinkSection = tw.div`flex flex-col gap-4`

const LinkSectionHeader = tw.h2`font-semibold`

const NavigationLink = tw.a`text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline`

const SectionDivider = tw(Divider)`my-8 md:my-12`
