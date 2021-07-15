import { Spinner as ChakraSpinner } from '@chakra-ui/react'
import { useTheme } from 'next-themes'

const Spinner = () => {
  const { resolvedTheme } = useTheme()

  return (
    <ChakraSpinner
      size="lg"
      color={
        resolvedTheme === 'dark'
          ? 'var(--primary-color-dark)'
          : 'var(--primary-color)'
      }
    />
  )
}

export default Spinner
