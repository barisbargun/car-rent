import { VehicleGet } from '@repo/api/paths/vehicle/common'
import { useDeleteVehicle } from '@repo/api/paths/vehicle/delete'
import { Image } from '@repo/ui/components/image'
import { cn } from '@repo/ui/lib/utils'

import { ButtonModelDelete } from '@/components/shared/buttons/model-delete'
import { ButtonModelForm } from '@/components/shared/buttons/model-form'

import { VehicleUpdateForm } from './update-form'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: VehicleGet
}

export const VehicleCard = ({ data, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'flex-center relative overflow-hidden border-b-2 border-dashed p-4',
        className,
      )}
      data-testid="vehicle-card"
      {...props}
    >
      <Image
        src={data.img?.url}
        sizes={[200, 200, 150, 180, 130]}
        ratio={0.75}
        alt="vehicle"
      />

      {/** Buttons */}
      <div
        className="card-buttons absolute right-1 top-1 flex gap-2"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <ButtonModelForm type="UPDATE" model="vehicle" modelText="vehicle">
          <VehicleUpdateForm vehicle={data} />
        </ButtonModelForm>

        <ButtonModelDelete
          model="vehicle"
          id={data.id}
          mutate={useDeleteVehicle}
        />
      </div>
    </div>
  )
}
