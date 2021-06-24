import { extendTheme } from '@chakra-ui/react'
import colors from 'tailwindcss/colors'

const theme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  colors: {
    green: colors.emerald,
    gray: colors.gray,
  },

  baseStyle: {
    ring: {
      color: colors.emerald[500],
    },
  },
  components: {
    Switch: {
      parts: ['track'],
      baseStyle: {
        track: {
          _checked: { bg: colors.emerald[500] },
        },
      },
    },
  },
})

export default theme
