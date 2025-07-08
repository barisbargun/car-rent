import { FooterLink } from '@repo/api/paths/footer/link/common'
import { useDeleteFooterLink } from '@repo/api/paths/footer/link/delete'
import { cn } from '@repo/ui/lib/utils'

import { ButtonModelDelete } from '@/components/shared/buttons/model-delete'
import { ButtonModelForm } from '@/components/shared/buttons/model-form'

import { FooterLinkUpdateForm } from './update-form'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: FooterLink
}

export const FooterLinkCard = ({ data, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'flex-center relative overflow-hidden border-b-2 border-dashed p-8 px-4',
        className,
      )}
      data-testid="footerLink-card"
      {...props}
    >
      {/** Buttons */}
      <div
        className="card-buttons absolute right-1 top-1 z-10 flex gap-2"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <ButtonModelForm
          type="UPDATE"
          model="footerLink"
          modelText="footerLink"
        >
          <FooterLinkUpdateForm footerLink={data} />
        </ButtonModelForm>

        <ButtonModelDelete
          model="footerLink"
          id={data.id}
          mutate={useDeleteFooterLink}
        />
      </div>

      <strong className="max-xl:text-sm" title={data.title}>
        {data.title}
      </strong>
    </div>
  )
}
