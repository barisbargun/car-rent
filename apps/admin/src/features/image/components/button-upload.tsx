import { OpenDialog } from '@/components/global/open-dialog'

import { ImageCreateForm } from './create-form'

export const ButtonImageUpload = () => {
  return (
    <OpenDialog
      buttonText="Add New Image"
      title="Upload Image"
      desc="Maximum 700kb photos, less is better. You can zoom your picture."
      className="w-[600px]"
    >
      <ImageCreateForm />
    </OpenDialog>
  )
}
