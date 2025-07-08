import { OpenDialog, OpenDialogProps } from '@/components/global/open-dialog'

import { ImagesSelect } from './select'

type ImageButtonDialogSelectProps = Pick<
  OpenDialogProps,
  'buttonText' | 'hideButtonText' | 'buttonIconType'
> & {
  fieldChange?: any
  setImage: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const ImageButtonDialogSelect = ({
  buttonText,
  hideButtonText = false,
  buttonIconType,
  fieldChange,
  setImage,
}: ImageButtonDialogSelectProps) => {
  const dialogProps = { buttonText, hideButtonText, buttonIconType }
  const imagesSelectProps = { fieldChange, setImage }
  return (
    <OpenDialog
      {...dialogProps}
      title="Upload Image"
      desc="Choose an image."
      className="w-full"
    >
      <ImagesSelect {...imagesSelectProps} />
    </OpenDialog>
  )
}
