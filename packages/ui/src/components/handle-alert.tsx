import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog'
import { Loader } from './loader'

type Props = {
  trigger: (() => void) | (() => Promise<void>)
  isPending?: boolean
  title?: string
  desc?: string
  cancelMsg?: string
  continueMsg?: string
  children?: React.ReactNode
}

export const HandleAlert = ({
  trigger,
  isPending,
  title,
  desc,
  cancelMsg = 'Cancel',
  continueMsg = 'Continue',
  children,
}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-sm:w-[90%]">
        <AlertDialogHeader>
          <AlertDialogTitle>{title || 'Are you sure?'}</AlertDialogTitle>
          <AlertDialogDescription>
            {desc || 'This action will be change the daha and cannot be undone'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelMsg}</AlertDialogCancel>
          <AlertDialogAction onClick={() => Promise.resolve(trigger())}>
            {isPending && <Loader />}
            {continueMsg}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
