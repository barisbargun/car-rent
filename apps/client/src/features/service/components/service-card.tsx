import { ServiceGet } from '@repo/api/paths/service/common'
import { Image } from '@repo/ui/components/image'

type Props = {
  data: ServiceGet
}

export const ServiceCard = ({ data }: Props) => {
  return (
    <div className="flex-center w-52 flex-col gap-5 text-center max-md:w-[70%]">
      <Image src={data.img?.url} w={80} alt="service" />
      <div className="h-36 max-md:h-full">
        <h3 className="mb-1 line-clamp-2 text-base font-semibold tracking-tight">
          {data.title}
        </h3>
        <p className="line-clamp-4 text-sm opacity-70">{data.desc}</p>
      </div>
    </div>
  )
}
