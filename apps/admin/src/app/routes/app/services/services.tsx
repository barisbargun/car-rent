import { useServices } from '@repo/api/paths/service/get-all'
import { Skeleton } from '@repo/ui/components/skeleton'
import { useEffect } from 'react'

import { ButtonModelForm } from '@/components/shared/buttons/model-form'
import { ItemCounts } from '@/components/shared/item-counts'
import { ServiceCard } from '@/features/service/components/card'
import { ServiceCardSkeleton } from '@/features/service/components/card.skeleton'
import { ServiceCreateForm } from '@/features/service/components/create-form'
import { toast } from '@/lib/toast'

const ServicesSkeleton = () => (
  <>
    <div className="flex w-full justify-start items-gap">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-32" />
    </div>
    <div className="grid w-full grid-cols-2 gap-4 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <ServiceCardSkeleton key={i} />
      ))}
    </div>
  </>
)

const ServicesRoute = () => {
  const { data: services, isPending, isError } = useServices()

  useEffect(() => {
    if (isError) {
      toast.api.fetch('service').error()
    }
  }, [isError])

  if (isPending) return <ServicesSkeleton />
  return (
    <>
      <div className="flex flex-wrap justify-center gap-8 lg:gap-4">
        {services?.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            className="w-full lg:w-[calc(50%-0.5rem)]"
          />
        ))}
      </div>
      <ButtonModelForm model="service" modelText="Service" type="ADD" itemsCount={services?.length}>
        <ServiceCreateForm  />
      </ButtonModelForm>
      <ItemCounts count={services?.length} model="service" />
    </>
  )
}

export default ServicesRoute
