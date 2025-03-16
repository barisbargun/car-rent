import { ImageUploader } from '../types'

export async function getCroppedImg({
  file,
  width,
  height,
  x,
  y,
}: ImageUploader): Promise<File> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.addEventListener('load', () => resolve(img))
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    img.onerror = (error) => reject(error)
  })

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('Canvas context not available')

  canvas.width = width
  canvas.height = height

  ctx.drawImage(image, x, y, width, height, 0, 0, width, height)

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Canvas is empty'))
    }, file.type || 'image/jpeg')
  })

  return new File([blob], file.name, { type: blob.type })
}
