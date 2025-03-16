import { useCallback, useEffect, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'

import { toast } from '@/lib/toast'

import { ImageUploader as ImageUploaderType } from '../types'
import { ImageCrop } from './crop'

type props = {
  fieldChange: (...event: any[]) => void
}

export const ImageUploader = ({ fieldChange }: props) => {
  const [file, setFile] = useState<Partial<ImageUploaderType>>()
  const [fileUrl, setFileUrl] = useState<string | undefined>()

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    const size = acceptedFiles[0].size / 1024
    if (size > 701) return toast.image.drop.warning()
    setFile((v) => ({ ...v, file: acceptedFiles[0] }))
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
  })

  useEffect(() => {
    fieldChange(file)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  return (
    <div className="h-full w-full flex-center">
      <div {...(fileUrl ? {} : getRootProps())} className="w-full">
        {!fileUrl && <input {...getInputProps()} />}

        <div className="flex h-60 w-full cursor-pointer flex-col flex-center sm:h-80">
          {fileUrl ? (
            <ImageCrop fileUrl={fileUrl} setFile={setFile} />
          ) : (
            <div className="h-full w-full flex-col rounded-xl border-2 border-dashed flex-center">
              <h3 className="text-sm text-muted-foreground">
                Click or drag a file
              </h3>
              <h3 className="text-xs text-muted-foreground">
                (SVG, PNG, JPG, AVIF)
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
