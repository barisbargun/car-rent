import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { CarouselGet } from '@repo/api/paths/carousel/common'
import { Image } from '@repo/ui/components/image'
import React from 'react'

import { H1, H4 } from '@/components/global/typography'

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
    <div className="relative h-screen w-screen text-white">
      <Image
        fill
        src={data.img?.url}
        widthList={[1500, 1300, 1000, 600, 400]}
        alt="carousel"
        loading="eager"
        className="h-screen object-cover"
      />
      <div className="absolute left-0 top-0 flex h-screen w-full justify-center">
        <div className="container relative">
          <div className="absolute top-28 w-full max-md:top-20">
            <H1 className="w-[700px] max-w-[90%] text-balance font-bold uppercase drop-shadow-black">
              {data.title}
            </H1>
            <p className="mt-4 max-w-[50%] text-sm drop-shadow-black max-lg:hidden">
              {data.desc}
            </p>
          </div>
          <div className="absolute bottom-20 flex flex-col ">
            <H4 className="text-balance font-bold text-white drop-shadow-black">
              {data.vehicleName}
            </H4>
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
