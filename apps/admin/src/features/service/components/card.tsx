import { ServiceGet } from '@repo/api/paths/service/common'
import { Image } from '@repo/ui/components/image'
import { cn } from '@repo/ui/lib/utils'

import { ButtonModelForm } from '@/components/shared/buttons/model-form'

import { ServiceUpdateForm } from './update-form'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  service: ServiceGet
}

export const ServiceCard = ({ service, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'bg-background relative flex flex-col gap-4 rounded p-3',
        className,
      )}
      data-testid="service-card"
      {...props}
    >
      {/** Image and Text */}
      <div className="flex-center gap-4">
        <Image
          src={service.img?.url}
          sizes={[60, 60, 60, 80, 50]}
          alt="service"
        />
        <div className="flex-1">
          <p className="line-clamp-3 w-full text-sm" title={service.desc}>
            {service.desc}
          </p>
          <div className="mt-1 flex items-end justify-between gap-2 xl:mt-2">
            {/** Fullname and occupation */}
            <div>
              <strong
                className="text-muted-foreground text-xs xl:text-sm"
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
