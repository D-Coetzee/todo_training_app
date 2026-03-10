'use client'

import { IconButton, Skeleton, chakra } from '@chakra-ui/react'
import { ThemeProvider, useTheme } from 'next-themes'

import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'

function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return mounted ? children : fallback
}

export function ColorModeProvider({ children, ...props }) {
  return (
    <ThemeProvider attribute='class' disableTransitionOnChange {...props}>
      {children}
    </ThemeProvider>
  )
}

export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const colorMode = forcedTheme || resolvedTheme
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  return {
    colorMode: colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

export const ColorModeButton = React.forwardRef(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode()
  return (
    <ClientOnly fallback={<Skeleton boxSize="9" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        sx={{
          '& .chakra-icon': {
            width: '1.25rem',
            height: '1.25rem',
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  )
})

const Span = chakra('span')

export const LightMode = React.forwardRef(function LightMode(props, ref) {
  return (
    <Span
      display="contents"
      className="chakra-theme light"
      ref={ref}
      {...props}
    />
  )
})

export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
  return (
    <Span
      display="contents"
      className="chakra-theme dark"
      ref={ref}
      {...props}
    />
  )
})
