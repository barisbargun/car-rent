import { Service } from '@repo/typescript-config/types/api'
import { useMemo } from 'react'

export const ServiceCard = ({ data }: { data: Service }) => {
  const getLogo = useMemo(() => {
    const url = data.img?.url
    if (url) {
      const urlSplit = url.split('/image/upload/')
      return `${urlSplit[0]}/image/upload/h_80/${urlSplit[1]}`
    }
  }, [data?.img?.url])
  return (
    <div className="w-52 flex-col gap-5 text-center flex-center max-md:w-[70%]">
      <img src={getLogo || ''} alt="service icon" />
      <div className="h-36 max-md:h-full">
        <h3 className="mb-1 line-clamp-2 text-base font-semibold tracking-tight">
          {data.title}
        </h3>
        <p className="line-clamp-4 text-sm opacity-70">{data.desc}</p>
      </div>
    </div>
  )
}
