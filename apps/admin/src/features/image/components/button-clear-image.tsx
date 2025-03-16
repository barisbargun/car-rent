import { Button, ButtonProps } from '@repo/ui/components/button'
import { BrushCleaning } from 'lucide-react'

type Props = ButtonProps & {
  name?: string
}

export const ButtonClearImage = ({ name = '', ...props }: Props) => {
  return (
    <Button
      size="icon"
      variant="outline"
      title="clear"
      type='button'
      {...props}
    >
      <span className="sr-only">Clear {name}{name.length > 0 ? ' ' : ''}image</span>
      <BrushCleaning />
    </Button>
  )
}
