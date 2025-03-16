import { ServiceGet } from '@repo/api/types/service'
import { cn } from '@repo/ui/lib/utils'

import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { Image } from '@/features/image/components/image'

import { ServiceUpdateForm } from './update-form'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  service: ServiceGet
}

export const ServiceCard = ({ service, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-4 rounded bg-background p-3',
        className,
      )}
      data-testid="service-card"
      {...props}
    >
      {/** Image and Text */}
      <div className="gap-4 flex-center">
        <Image src={service.img?.url} widthList={[60,60,60,80,50]} alt="service" />
        <div className="flex-1">
          <p className="line-clamp-3 w-full text-sm" title={service.desc}>
            {service.desc}
          </p>
          <div className="mt-1 xl:mt-2 flex items-end justify-between gap-2">
            {/** Fullname and occupation */}
            <div>
              <strong
                className="text-xs xl:text-sm text-muted-foreground"
                title={service.title}
              >
                {service.title}
              </strong>
            </div>
            {/** Buttons */}
            <div className="flex origin-bottom-right scale-75 gap-2">
              <ButtonModelForm
                type="UPDATE"
                model="service"
                modelText="service"
              >
                <ServiceUpdateForm service={service} />
              </ButtonModelForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
