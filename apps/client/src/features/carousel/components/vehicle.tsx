import { CarouselGet } from '@repo/api/paths/carousel/common'
import { Image } from '@repo/ui/components/image'
import React from 'react'

import { H1, H2 } from '@/components/global/typography'

type Props = {
  data: CarouselGet
}

export const CarouselVehicle = ({ data }: Props) => {
  const Feature = ({
    label,
    children,
  }: {
    label: string
    children: React.ReactNode
  }) => (
    <div className="*:drop-shadow-black">
      <small className="text-xs opacity-85">{label}</small>
      <p className="font-semibold">{children}</p>
    </div>
  )

  return (
    <div className="relative text-white">
      <Image
        fill
        src={data.img?.url}
        sizes={[1500, 1300, 1000, 600, 400]}
        alt="carousel"
        loading="eager"
        className="h-screen w-full object-cover"
      />
      <div className="absolute left-0 top-0 flex h-screen w-full justify-center max-sm:pl-4">
        <div className="container relative">
          <div className="absolute top-28 w-full max-md:top-20">
            {data.title && (
              <H1 className="drop-shadow-black w-[700px] max-w-[90%] text-balance font-bold uppercase">
                {data.title}
              </H1>
            )}

            {data.desc && (
              <p className="drop-shadow-black mt-4 max-w-[50%] text-sm max-lg:hidden">
                {data.desc}
              </p>
            )}
          </div>
          <div className="absolute bottom-10 flex flex-col 2xl:bottom-20">
            <H2 className="drop-shadow-black font-bold text-white">
              {data.vehicleName}
            </H2>
            <div className="mt-3 flex gap-8 max-lg:hidden">
              <Feature label="Base Price">
                ${data.price}
                <span className="text-sm">/hour</span>
              </Feature>
              <Feature label="Engine">{data.engine}</Feature>
              <Feature label="Horse power">{data.power} HP</Feature>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
