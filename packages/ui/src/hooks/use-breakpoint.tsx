import { useEffect, useState } from 'react'

const breakpoints = [1536, 1280, 1024, 640, 0] // 2xl, xl, lg, sm, max-sm

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
