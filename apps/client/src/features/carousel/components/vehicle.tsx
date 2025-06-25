import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { CarouselGet } from '@repo/api/types/carousel'
import { Image } from '@repo/ui/components/image'
import React from 'react'

import { H1, H2, H3 } from '@/components/global/typography'

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
    <div>
      <small className="text-sm opacity-85">{label}</small>
      <H3 as="p" className="font-semibold">
        {children}
      </H3>
    </div>
  )

  return (
    <div className="relative h-screen w-screen text-black">
      <Image
        fill
        src={data.img?.url}
        widthList={[1500, 1300, 1000, 600, 400]}
        alt="carousel"
      />
      <div className="absolute left-0 top-0 flex h-screen w-full justify-center">
        <div className="container relative">
          <div className="absolute top-28 w-full max-md:top-20">
            <H2 className="w-[700px] max-w-[90%] text-balance uppercase">
              {data.title}
            </H2>
            <h2 className="max-w-[50%] text-sm">{data.desc}</h2>
          </div>
          <div className="max-desktop:bottom-20 absolute bottom-28 flex flex-col max-sm:hidden">
            <H1 className="text-balance uppercase">{data.vehicleName}</H1>
            <div className="my-3 h-1 bg-gradient-to-r from-slate-800"></div>
            <div className="flex gap-8">
              <Feature label="Base Price">
                ${data.price}
                <span className="text-sm">/hour</span>
              </Feature>
              <Feature label="Engine">{data.engine}</Feature>
              <Feature label="Horse power">{data.power}</Feature>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
