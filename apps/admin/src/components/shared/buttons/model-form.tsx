import { MODELS } from '@repo/api/config/api-paths'
import { maxItemCounts } from '@repo/api/config/max-item-counts'
import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { cn } from '@repo/ui/lib/utils'

import { OpenDialog, OpenDialogProps } from '@/components/global/open-dialog'
import { useBreakpoint } from '@/hooks/use-breakpoint'
import { Authorization } from '@/lib/authorization'

type Props = {
  type: 'ADD' | 'UPDATE'
  itemsCount?: number
  model: MODELS
  modelText:string
  dialogProps?: Partial<OpenDialogProps>
  children: React.ReactNode
}

export const ButtonModelForm = ({
  type,
  itemsCount = Infinity,
  dialogProps,
  model,
  modelText,
  children,
}: Props) => {
  const breakpoint = useBreakpoint()

  const isAdd = type === 'ADD'

  if (isAdd && itemsCount >= maxItemCounts[model]) return

  const defaultProps: OpenDialogProps = isAdd
    ? {
        buttonText: `Add ${modelText}`,
        hideButtonText: breakpoint > 2,
        buttonIconType: 'ADD',
        title: `Add a new ${modelText}`,
        desc: `Add a new item for your ${modelText}.`,
      }
    : {
        buttonText: `Edit ${modelText}`,
        hideButtonText: true,
        buttonIconType: 'EDIT',
        title: 'Update',
        desc: `Update ${modelText} for your website.`,
      }

  const dialog = (
    <OpenDialog
      {...defaultProps}
      {...dialogProps}
      className={cn('w-full lg:w-[26rem] xl:w-[32rem]', dialogProps?.className)}
    >
      {children}
    </OpenDialog>
  )

  const content = isAdd ? (
    <div className="page-b-p page-r-p fixed bottom-0 right-0 z-20">
      {dialog}
    </div>
  ) : (
    dialog
  )

  return (
    <Authorization
      checkRole={(REQUIRED_ROLE[model] as any)?.[type.toLowerCase()]}
    >
      {content}
    </Authorization>
  )
}
