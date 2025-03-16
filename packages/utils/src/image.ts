export const getCloudinaryImage = ({
  src,
  w,
  h,
  fallback,
}: {
  src: string | undefined
  w?: number
  h?: number
  fallback?: string
}) => {
  if (!src)
    return (
      fallback ||
      `https://dummyimage.com/${w || h || 200}x${h || w || 200}&text=No%20Image`
    )
  if (!src?.includes('/image/upload/')) return src || ''
  const [split1, split2] = src.split('/image/upload/')
  const transformations = [w ? `w_${w}` : '', h ? `h_${h}` : '', 'c_lfill']
    .filter(Boolean)
    .join(',')

  return `${split1}/${transformations}/${split2}`
}
