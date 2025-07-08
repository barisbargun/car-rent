import { Button } from '@repo/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPrimitive,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog'
import { cn } from '@repo/ui/lib/utils'
import { PlusIcon, SquarePen } from 'lucide-react'
import React, { useState } from 'react'

export type DialogProps = {
  closeDialog?: () => void | undefined
}

export type OpenDialogProps = DialogPrimitive.DialogContentProps & {
  buttonText: string
  hideButtonText?: boolean
  buttonIconType?: 'ADD' | 'EDIT'
  title: string
  desc?: string
}

export const OpenDialog = ({
  buttonText,
  hideButtonText,
  buttonIconType,
  title,
  desc,
  children,
  className,
  ...props
}: OpenDialogProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        closeDialog: () => setDialogOpen(false),
      } as DialogProps)
    }
    return child
  })

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          title={buttonText}
          variant="outline"
          size={hideButtonText ? 'icon' : 'default'}
        >
          {(buttonIconType == 'EDIT' && <SquarePen />) ||
            (buttonIconType == 'ADD' && <PlusIcon />)}
          <span className={hideButtonText ? 'sr-only' : ''}>{buttonText}</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          'custom-scrollbar max-h-[90%] w-fit max-w-[90vw] overflow-y-auto border-4 sm:max-w-[80vw]',
          className,
        )}
        {...props}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {desc && <DialogDescription>{desc}</DialogDescription>}
        </DialogHeader>
        <div className="flex-center space-x-2">{childrenWithProps}</div>
      </DialogContent>
    </Dialog>
  )
}
