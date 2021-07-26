import { useState, useEffect, useRef } from 'react'
import tw, { styled } from 'twin.macro'
import { HiMenu, HiSun, HiMoon } from 'react-icons/hi'
import { useColorMode } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { useClickAway } from 'react-use'
import Logo from './Logo'
import { Search } from 'components/anime-search'

type HeaderTypes = {
  onHamburgerClick: () => void
  isSearchModalOpen: boolean
  onSearchModalOpen: (val: boolean) => void
}

const Header = ({
  onHamburgerClick,
  isSearchModalOpen,
  onSearchModalOpen,
}: HeaderTypes) => {
  const [mounted, setMounted] = useState(typeof document !== 'undefined')
  const { resolvedTheme, setTheme } = useTheme()
  const { colorMode, toggleColorMode } = useColorMode()

  // don't render dependent theme UI until mounted on the client
  useEffect(() => setMounted(true), [])

  // sync tailwind and chakra UI
  useEffect(() => {
    if (resolvedTheme !== colorMode) toggleColorMode()
  }, [colorMode, resolvedTheme, toggleColorMode])

  const toggleDarkMode = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation()
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    toggleColorMode()
  }

  return (
    <>
      <Container>
        <HamburgerButton onClick={onHamburgerClick} />

        <Logo mounted={mounted} />

        <Search
          isSearchModalOpen={isSearchModalOpen}
          onSearchModalOpen={onSearchModalOpen}
        />

        {/* wait until the component is mounted, then show the color mode toggle */}
        {!mounted ? (
          <div />
        ) : resolvedTheme === 'dark' ? (
          <DarkModeIcon onClick={toggleDarkMode} />
        ) : (
          <LightModeIcon onClick={toggleDarkMode} />
        )}
      </Container>
    </>
  )
}

export default Header

const Container = styled.div`
  ${tw`relative bg-white dark:bg-black grid px-6 items-center transition-colors shadow-sm dark:shadow-none z-30`}
  height: 60px;
  grid-template-columns: auto auto 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: auto 1fr auto auto;
  }
`

const HamburgerButton = tw(
  HiMenu,
)`h-6 w-6 mr-7 cursor-pointer hover:color[var(--primary-color)] dark:hover:color[var(--primary-color-dark)] transition-colors`

const DarkModeIcon = styled(HiMoon)`
  ${tw`justify-self-end inline-flex items-center w-5 h-full cursor-pointer select-none`}

  /* set the height of our grid content here to ensure the header stays 60px */
  height: 60px;
`

const LightModeIcon = styled(HiSun)`
  ${tw`justify-self-end inline-flex items-center w-5 h-full cursor-pointer select-none`}

  /* set the height of our grid content here to ensure the header stays 60px */
  height: 60px;
`
