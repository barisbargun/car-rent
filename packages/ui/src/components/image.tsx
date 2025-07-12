import React, { useState } from 'react'

import { cn } from '../lib/utils'

type Props = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'width' | 'height' | 'sizes'
> & {
  ratio?: number
  fill?: boolean
  alt: string
  fallback?: string
  containerClassName?: string
} & (
    | { w: number; sizes?: never }
    | { w?: never; sizes: [number, number, number, number, number] }
  )

export const Image = ({
  src,
  w = 100,
  sizes,
  fallback,
  ratio = 1,
  fill = false,
  containerClassName,
  className,
  ...props
}: Props) => {
  const [isError, setIsError] = useState(false)

  const width = w ?? (sizes?.length ? sizes[0] : 100)
  const height = Math.round(width * ratio)

  const getImage = (width: number) => {
    if (!src || isError)
      return (
        fallback ||
        `https://dummyimage.com/${width}x${width * ratio}&text=No%20Image`
      )

    if (!src.includes('/image/upload/')) return src || ''
    const [split1, split2] = src.split('/image/upload/')
    const transformations = [width ? `w_${width * 2}` : '', 'c_lfill']
      .filter(Boolean)
      .join(',')

    return `${split1}/${transformations}/${split2}`
  }

  const getSource = (media: string, width: number) => (
    <source
      {...(media ? { media: media } : {})}
      {...(fill ? {} : { width: width })}
      srcSet={getImage(width)}
    />
  )

  return (
    <picture
      className={cn('pointer-events-none', containerClassName)}
      style={fill ? { width: '100%', height: '100%' } : {}}
    >
      {sizes ? (
        <>
          {getSource('(width >= 1536px)', sizes[0])}
          {getSource('(width >= 1280px)', sizes[1])}
          {getSource('(width >= 1024px)', sizes[2])}
          {getSource('(width >= 640px)', sizes[3])}
          {getSource('(width < 640px)', sizes[4])}
        </>
      ) : (
        getSource('', w)
      )}

      <img
        loading="lazy"
        src={getImage(1024)}
        width={width}
        height={height}
        style={fill ? {} : { aspectRatio: `${ratio}` }}
        className={cn(
          'mx-auto max-h-full max-w-full object-contain',
          fill && 'h-full w-full',
          className,
        )}
        onError={() => setIsError(true)}
        {...props}
      />
    </picture>
  )
}
