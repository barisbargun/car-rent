import { Vehicle } from '@repo/typescript-config/types/api'
import { useMemo } from 'react'

type Props = {
  data: Vehicle
}
export const VehicleCard = ({ data }: Props) => {
  const getImg = useMemo(() => {
    let url: any = data.img?.url
    if (url) {
      url = url.split('/image/upload/')
      url = `${url[0]}/image/upload/h_150,c_lfill/${url[1]}`
    }
    return url
  }, [data?.img?.url])

  return (
    <div className="cursor-pointer flex-col gap-4 p-4 shadow-lg transition-transform flex-center sm:hover:scale-110">
      <img src={getImg || ''} alt="vehicle" className="w-fit object-cover" />
      <h4 className="line-clamp-2 w-full text-xl">{data.title}</h4>
      <div className="mt-2 flex h-10 w-full justify-between gap-4">
        <div className="w-28 flex-col flex-center">

          <p className="text-xs md:text-sm">{data.wheel}</p>
        </div>
        <div className="w-28 flex-col flex-center">

          <p className="text-xs md:text-sm">{data.drivetrain}</p>
        </div>
        <div className="w-28 flex-col flex-center">


          <p className="text-xs md:text-sm">
            {data.fuel}
            <span className="text-[10px] opacity-60 md:text-xs">/mpg</span>
          </p>
        </div>
      </div>
    </div>
  )
}
