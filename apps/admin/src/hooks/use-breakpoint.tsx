import { useCallback, useEffect, useState } from 'react'

import { env } from '@/config/env'

const breakpoints = [1536, 1280, 1024, 640, 0] // 2xl, xl, lg, sm, max-sm

export type UseBreakpointArray = [
  _2xl: number,
  xl: number,
  lg: number,
  sm: number,
  max_sm: number,
]

/**
 * Custom hook that returns a numeric value based on the current breakpoint
 * Returns:
 * - 5 for 2xl and above
 * - 4 for xl and above (but below 2xl)
 * - 3 for lg and above (but below xl)
 * - 2 for sm and above (but below lg)
 * - 1 for below sm
 *
 * @returns {number} A number from 1-5 representing the current breakpoint
 */
export const useBreakpoint = (): number => {
  const [breakpointValue, setBreakpointValue] = useState(5)

  useEffect(() => {
    if (typeof globalThis === 'undefined' || env.MODE === 'test') {
      setBreakpointValue(5)
      return
    }

    const updateBreakpoint = () => {
      const width = window.innerWidth
      const index = breakpoints.findIndex((bp) => width >= bp)
      setBreakpointValue(index === -1 ? 5 : 5 - index)
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpointValue
}
// Example usage:
// const breakpointValue = useBreakpoint();
// breakpointValue // Will be 5, 4, 3, 2, or 1

export const useBreakpointArray = () => {
  const [breakpointIndex, setBreakpointIndex] = useState(1)

  useEffect(() => {
    if (typeof globalThis === 'undefined' || env.MODE === 'test') {
      setBreakpointIndex(env.MODE === 'test' ? 0 : 1)
      return
    }

    const getBreakpointIndex = () => {
      const width = window.innerWidth
      return breakpoints.findIndex((bp) => width >= bp)
    }

    const updateBreakpoint = () => {
      const index = getBreakpointIndex()
      setBreakpointIndex(index === -1 ? 4 : index)
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return useCallback(
    (...breakpoints: UseBreakpointArray): number =>
      breakpoints[breakpointIndex],
    [breakpointIndex],
  )
}

// Example usage:
// const breakpointArr = useBreakpoint();
// breakpointArr(200, 200, 150, 150, 50)
