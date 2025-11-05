// hooks/useBreakpoints.ts
import { createContext, useContext, useEffect, useState } from 'react'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface BreakpointContextType {
  breakpoint: Breakpoint
  width: number
}

const BreakpointContext = createContext<BreakpointContextType>({
  breakpoint: 'xl',
  width: 1200
})

export const useBreakpoints = () => useContext(BreakpointContext)

// Device breakpoints sesuai dengan MUI default
const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
}

export const BreakpointProvider: React.FC<{
  children: React.ReactNode
  forcedBreakpoint?: Breakpoint
  forcedWidth?: number
}> = ({ children, forcedBreakpoint, forcedWidth }) => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('xl')
  const [width, setWidth] = useState(forcedWidth || 1200)

  useEffect(() => {
    if (forcedBreakpoint && forcedWidth) {
      setBreakpoint(forcedBreakpoint)
      setWidth(forcedWidth)
      return
    }

    const handleResize = () => {
      const windowWidth = window.innerWidth
      setWidth(windowWidth)

      if (windowWidth >= breakpoints.xl) setBreakpoint('xl')
      else if (windowWidth >= breakpoints.lg) setBreakpoint('lg')
      else if (windowWidth >= breakpoints.md) setBreakpoint('md')
      else if (windowWidth >= breakpoints.sm) setBreakpoint('sm')
      else setBreakpoint('xs')
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [forcedBreakpoint, forcedWidth])

  return <BreakpointContext.Provider value={{ breakpoint, width }}>{children}</BreakpointContext.Provider>
}
