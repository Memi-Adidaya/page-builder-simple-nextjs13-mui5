// hooks/useDeviceBreakpoints.ts
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useBreakpoints } from './useBreakpoints'

export const useDeviceBreakpoints = () => {
  const theme = useTheme()
  const { breakpoint } = useBreakpoints()

  // Fallback ke media query biasa jika tidak dalam preview mode isMobile, isTablet, isDesktop
  const isMobileSmall = useMediaQuery(theme.breakpoints.down('xs'))
  const isMobile = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const isLaptop = useMediaQuery(theme.breakpoints.between('lg', 'xl'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('xl'))

  // Gunakan breakpoint dari context jika tersedia, otherwise use media queries
  return {
    isMobileSmall: breakpoint === 'xs' || isMobileSmall,
    isMobile: breakpoint === 'sm' || isMobile,
    isTablet: breakpoint === 'md' || isTablet,
    isLaptop: breakpoint === 'lg' || isLaptop,
    isDesktop: breakpoint === 'xl' || isDesktop,
    currentBreakpoint: breakpoint
  }
}
