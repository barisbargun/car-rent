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
        <p className="mb-1 line-clamp-2 font-semibold tracking-tight">
          {data.title}
        </p>
        <p className="text-muted-foreground line-clamp-4 text-sm">
          {data.desc}
        </p>
      </div>
    </div>
  )
}
