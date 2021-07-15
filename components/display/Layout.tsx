import React, { useState, useRef, useEffect } from 'react'
import tw, { styled } from 'twin.macro'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { useTheme } from 'next-themes'
import Header from './Header'
import SideNavigation from './SideNavigation'
import SEO, { SEOProps } from './SEO'

type LayoutProps = {
  children: React.ReactElement | React.ReactElement[]
  seo: SEOProps
  noPadding?: boolean
  shouldFullyCollapse?: boolean
}

const Layout = ({
  children,
  seo,
  noPadding = false,
  shouldFullyCollapse = false,
}: LayoutProps) => {
  const scrollBarRef = useRef<OverlayScrollbarsComponent>(null)
  const { resolvedTheme } = useTheme()
  const [isSideNavigationExpanded, setIsSideNavigationExpanded] =
    useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <>
      <SEO {...seo} />

      <Container>
        <Header
          onHamburgerClick={() =>
            setIsSideNavigationExpanded(!isSideNavigationExpanded)
          }
        />

        <ContentContainer>
          <SideNavigation
            isExpanded={isSideNavigationExpanded}
            onClose={() => setIsSideNavigationExpanded(false)}
            shouldFullyCollapse={shouldFullyCollapse}
            currentPath={seo.url}
          />

          {/* don't render any client-dependent state until actually mounted on the client */}
          {mounted ? (
            <OverlayScrollbar
              className={
                resolvedTheme === 'dark' ? 'os-theme-light' : 'os-theme-dark'
              }
              $noPadding={noPadding}
              options={{ scrollbars: { autoHide: 'scroll' } }}
              ref={scrollBarRef}
            >
              {/* give all children access to the scrollBarRef just incase 🤗 */}
              {React.Children.map(children, (child) => {
                return React.cloneElement(
                  child,
                  { scrollBarRef, ...child.props },
                  child.props?.children || null,
                )
              })}
            </OverlayScrollbar>
          ) : null}
        </ContentContainer>
      </Container>
    </>
  )
}

export default Layout

const Container = tw.div`flex flex-col h-screen overflow-hidden`

const ContentContainer = tw.div`relative flex flex-grow`

const OverlayScrollbar = styled(OverlayScrollbarsComponent)<{
  $noPadding: boolean
}>`
  ${({ $noPadding }) => [
    tw`relative h-full flex-grow bg-gray-50 dark:bg-gray-900 transition-colors overflow-hidden w-screen`,
    !$noPadding && tw`px-6 md:px-14 py-8 md:py-10`,
  ]}
`
