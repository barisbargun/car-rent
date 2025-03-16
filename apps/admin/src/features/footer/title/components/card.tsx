import { useDeleteFooterTitle } from '@repo/api/paths/footer/title/delete'
import { FooterTitle } from '@repo/api/types/footer'
import { cn } from '@repo/ui/lib/utils'

import { ButtonModelDelete } from '@/components/shared/buttons/model-delete'
import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ButtonModelSwap } from '@/components/shared/buttons/model-swap'

import { FooterTitleUpdateForm } from './update-form'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: FooterTitle
  handleSwap: (id: string) => void
  swapId: string | undefined
}

export const FooterTitleCard = ({
  data,
  handleSwap,
  swapId,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={cn(
        'relative aspect-[3] overflow-hidden rounded border-4 border-secondary shadow flex-center lg:aspect-[5/3]',
        className,
      )}
      data-testid="footerTitle-card"
      {...props}
    >
      {/** Buttons */}
      <div className="absolute right-1 top-1 flex gap-2 card-buttons">
        <ButtonModelForm
          type="UPDATE"
          model="footerTitle"
          modelText="footerTitle"
        >
          <FooterTitleUpdateForm footerTitle={data} />
        </ButtonModelForm>

        <ButtonModelDelete
          model="footerTitle"
          id={data.id}
          mutate={useDeleteFooterTitle}
        />

        <ButtonModelSwap
          model="footerTitle"
          id={data.id}
          swapId={swapId}
          handleSwap={handleSwap}
        />
      </div>

      <strong title={data.title}>{data.title}</strong>
    </div>
  )
}
