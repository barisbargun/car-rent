import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Carousel } from '@repo/typescript-config/types/api'
import React from 'react'
import Slider from 'react-slick'

import { H1, H2, H3 } from '@/components/global/typography'

import { carouselSettings } from '../config'

type Props = {
  data: Carousel[]
  setRef: React.Dispatch<Slider | null>
  setPage: React.Dispatch<React.SetStateAction<number>>
}

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

export const CarouselVehicle = ({ data, setPage, setRef }: Props) => {
  return (
    <Slider
      {...carouselSettings}
      className=""
      ref={(slider) => setRef(slider)}
      afterChange={(e) => setPage(e + 1)}
    >
      {data
        ?.slice()
        .sort((a, b) => a.index - b.index)
        .map((v) => (
          <div key={v.id} className="relative h-screen w-screen text-black">
            <img
              src={v.img.url || ''}
              alt="car img"
              className="h-screen w-screen object-cover opacity-80"
            />
            <div className="absolute left-0 top-0 flex h-screen w-full justify-center">
              <div className="container relative">
                <div className="absolute top-28 w-full max-md:top-20">
                  <H2 className="w-[700px] max-w-[90%] text-balance uppercase">
                    {v.title}
                  </H2>
                  <h2 className="max-w-[50%] text-sm">{v.desc}</h2>
                </div>
                <div className="absolute bottom-28 flex flex-col max-desktop:bottom-20 max-sm:hidden">
                  <H1 className="text-balance uppercase">{v.vehicleName}</H1>
                  <div className="my-3 h-1 bg-gradient-to-r from-slate-800"></div>
                  <div className="flex gap-8">
                    <Feature label="Base Price">
                      ${v.price}
                      <span className="text-sm">/hour</span>
                    </Feature>
                    <Feature label="Engine">{v.engine}</Feature>
                    <Feature label="Horse power">{v.power}</Feature>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Slider>
  )
}
