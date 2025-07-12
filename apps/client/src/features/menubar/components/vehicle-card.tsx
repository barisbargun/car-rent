import {
  DRIVE_TRAIN_LIST_UI,
  VehicleGet,
  WHEEL_DRIVE_LIST_UI,
} from '@repo/api/paths/vehicle/common'
import { Image } from '@repo/ui/components/image'

import assets from '@/assets'

type Props = {
  data: VehicleGet
}
export const VehicleCard = ({ data }: Props) => {
  return (
    <div className="flex-center cursor-pointer flex-col gap-4 p-4 shadow-lg transition-transform sm:hover:scale-110">
      <Image
        src={data.img?.url}
        sizes={[250, 250, 250, 250, 170]}
        alt="vehicle"
      />
      <p className="line-clamp-2 w-full text-lg xl:text-xl">{data.title}</p>
      <div className="mt-2 flex h-10 w-full justify-between gap-4">
        <div className="flex-center w-28 flex-col">
          <img
            loading='lazy'
            src={assets.vehicleProps.steering}
            alt="steering-icon"
            width={20}
            height={20}
          />
          <p className="text-xs md:text-sm">
            {WHEEL_DRIVE_LIST_UI[data.wheel]}
          </p>
        </div>
        <div className="flex-center w-28 flex-col">
          <img
            loading='lazy'
            src={assets.vehicleProps.awd}
            alt="awd-icon"
            width={20}
            height={20}
          />
          <p className="text-xs md:text-sm">
            {DRIVE_TRAIN_LIST_UI[data.drivetrain]}
          </p>
        </div>
        <div className="flex-center w-28 flex-col">
          <img
            loading='lazy'
            src={assets.vehicleProps.fuel}
            alt="fuel-icon"
            width={20}
            height={20}
          />

          <p className="text-xs md:text-sm">
            {data.fuel}
            {!Number.isNaN(Number(data.fuel)) && (
              <span className="text-[10px] opacity-60 md:text-xs">/mpg</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
