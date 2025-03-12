import { Review } from '@repo/typescript-config/types/api'
import { useMemo } from 'react'

type Props = {
  data: Review
}

const colors = [
  'to-slate-200',
  'to-pink-200',
  'to-blue-200',
  'to-lime-200',
  'to-yellow-200',
]
export const ReviewCard = ({ data }: Props) => {
  const getAvatar = useMemo(() => {
    let url: any = data.img?.url
    if (url) {
      url = url.split('/image/upload/')
      url = `${url[0]}/image/upload/w_55,h_55,c_lfill/${url[1]}`
    }
    return url
  }, [data?.img?.url])

  return (
    <div
      className={
        'h-[240px] w-[500px] overflow-hidden rounded-md bg-gradient-to-br from-white p-6 max-md:h-[300px] ' +
        colors[(data.index - 1) % colors.length]
      }
    >
      <div className="flex items-center gap-4">
        <div>
          <img
            src={getAvatar}
            alt="person-img"
            width={55}
            height={55}
            className="rounded-full"
          />
        </div>
        <div>
          <h4 className="text-md font-medium leading-none">{data.fullname}</h4>
          <p className="text-xs text-muted-foreground">{data.occupation}</p>
        </div>
      </div>
      <div>
        <p className="mt-6 line-clamp-5 text-sm opacity-90">{data.desc}</p>
      </div>
    </div>
  )
}
