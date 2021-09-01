import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'
import { useTheme } from 'next-themes'

const CustomStyles = createGlobalStyle<{ resolvedTheme?: string }>`
  body {
    -webkit-tap-highlight-color: ${theme`colors.emerald.500`};
    ${tw`antialiased bg-gray-50! dark:bg-gray-900! text-gray-900 dark:text-gray-50 overflow-hidden`}
    
    --primary-color: ${theme`colors.emerald.500`};
    --primary-color-dark: ${theme`colors.emerald.200`};
    --primary-color-hover: ${theme`colors.emerald.600`};
    --primary-color-dark-hover: ${theme`colors.emerald.300`};
  }

  button, a {
    ${tw`focus:outline-none`}
  }

  hr {
    box-sizing: border-box !important;
  }

  ::-moz-selection {
    color: ${({ resolvedTheme }) =>
      resolvedTheme === 'dark' ? 'black' : 'white'};;
    background: ${({ resolvedTheme }) =>
      resolvedTheme === 'dark'
        ? 'var(--primary-color-dark)'
        : 'var(--primary-color)'};
  }

  ::selection {
    color: ${({ resolvedTheme }) =>
      resolvedTheme === 'dark' ? 'black' : 'white'};;
    background: ${({ resolvedTheme }) =>
      resolvedTheme === 'dark'
        ? 'var(--primary-color-dark)'
        : 'var(--primary-color)'};
  }

  

  .swiper-button-prev {
    ${tw`bg-gray-900 bg-opacity-50 h-full text-white px-8 opacity-0 hover:opacity-100 transition-all`}
    left: 0px;
    top: 16px;
  }

  .swiper-button-next {
    ${tw`bg-gray-900 bg-opacity-50 h-full text-white px-8 opacity-0 hover:opacity-100 transition-all`}
    height: 100%;
    right: 0px;
    top: 16px;
  }

  .swiper-button-disabled {
    ${tw`hidden`}
  }
`

const GlobalStyles = () => {
  const { resolvedTheme } = useTheme()

  return (
    <>
      <BaseStyles />
      <CustomStyles resolvedTheme={resolvedTheme} />
    </>
  )
}

export default GlobalStyles
