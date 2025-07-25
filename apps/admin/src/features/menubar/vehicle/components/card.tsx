import { MenubarVehicleGet } from '@repo/api/paths/menubar/vehicle/common'
import { useDeleteMenubarVehicle } from '@repo/api/paths/menubar/vehicle/delete'
import { Image } from '@repo/ui/components/image'
import { cn } from '@repo/ui/lib/utils'

import { ButtonModelDelete } from '@/components/shared/buttons/model-delete'
import { ButtonModelForm } from '@/components/shared/buttons/model-form'

import { MenubarVehicleUpdateForm } from './update-form'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: MenubarVehicleGet
}
export const MenubarVehicleCard = ({ data, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'flex-center relative overflow-hidden border-b-2 border-dashed p-4',
        className,
      )}
      data-testid="menubar-vehicle-card"
      {...props}
    >
      <Image
        src={data.img?.url}
        sizes={[250, 200, 150, 180, 130]}
        ratio={1.3}
        alt="menubar vehicle"
      />

      {/** Buttons */}
      <div
        className="card-buttons absolute right-1 top-1 z-10 flex gap-2"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <ButtonModelForm
          type="UPDATE"
          model="menubarVehicle"
          modelText="menubar vehicle"
        >
          <MenubarVehicleUpdateForm menubarVehicle={data} />
        </ButtonModelForm>

        <ButtonModelDelete
          model="menubarVehicle"
          id={data.id}
          mutate={useDeleteMenubarVehicle}
        />
      </div>
    </div>
  )
}
