import React, { useMemo, useState } from 'react'

import { UseBreakpointArray, useBreakpointArray } from '../hooks/use-breakpoint'
import { cn } from '../lib/utils'

type Props = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'width' | 'height'
> & {
  quality?: 'low' | 'medium' | 'high'
  heightRatio?: number
  fill?: boolean
  alt: string
  fallback?: string
  containerClassName?: string
} & (
    | { w: number; widthList?: never }
    | { w?: never; widthList: UseBreakpointArray }
  )

export const Image = ({
  src,
  w,
  widthList,
  fallback,
  quality = 'medium',
  heightRatio = 1,
  fill = false,
  containerClassName,
  className,
  ...props
}: Props) => {
  const [isError, setIsError] = useState(false)
  const breakpointArray = useBreakpointArray()
  const width = w || (widthList && breakpointArray(...widthList)) || 100
  const height = Math.round(width * heightRatio)

  const useImage = useMemo(() => {
    if (!src || isError)
      return (
        fallback || `https://dummyimage.com/${width}x${height}&text=No%20Image`
      )

    if (!src?.includes('/image/upload/')) return src || ''
    const [split1, split2] = src.split('/image/upload/')
    const multiply = quality === 'low' ? 1 : quality === 'medium' ? 2 : 3
    const transformations = [width ? `w_${width * multiply}` : '', 'c_lfill']
      .filter(Boolean)
      .join(',')

    return `${split1}/${transformations}/${split2}`
  }, [src, isError, width, height, quality, fallback])

  return (
    <div
      className={cn('flex-center pointer-events-none', containerClassName)}
      style={fill ? {} : { width, height }}
    >
      <img
        loading="lazy"
        src={useImage}
        width={width}
        height={height}
        className={cn(
          'max-h-full max-w-full object-contain',
          fill && 'h-full w-[100vw]',
          className,
        )}
        onError={() => setIsError(true)}
        {...props}
      />
    </div>
  )
}
