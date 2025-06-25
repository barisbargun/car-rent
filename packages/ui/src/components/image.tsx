import { getCloudinaryImage } from '@repo/utils/image'
import React, { ComponentProps } from 'react'

import { UseBreakpointArray, useBreakpointArray } from '../hooks/use-breakpoint'
import { cn } from '../lib/utils'

type BaseProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'width' | 'height'
> &
  Pick<ComponentProps<typeof getCloudinaryImage>, 'src' | 'fallback'>

type Props = BaseProps & {
  quality?: 'low' | 'medium' | 'high'
  heightRatio?: number
  fill?: boolean
  alt: string
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
  const breakpointArray = useBreakpointArray()
  const width = w || (widthList && breakpointArray(...widthList)) || 100
  const height = Math.round(width * heightRatio)
  return (
    <div
      className={cn('pointer-events-none flex-center', containerClassName)}
      style={fill ? {} : { width, height }}
    >
      <img
        loading="lazy"
        src={getCloudinaryImage({
          src,
          w: width * (quality === 'low' ? 1 : quality === 'medium' ? 2 : 3),
          fallback,
        })}
        width={width}
        height={height}
        className={cn(
          'max-h-full max-w-full object-contain',
          fill && 'h-full w-[100vw]',
          className,
        )}
        {...props}
      />
    </div>
  )
}
