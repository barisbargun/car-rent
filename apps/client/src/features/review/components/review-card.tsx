import { ReviewGet } from '@repo/api/paths/review/common'
import { Image } from '@repo/ui/components/image'
import { cn } from '@repo/ui/lib/utils'

const colors = [
  'to-slate-200',
  'to-pink-200',
  'to-blue-200',
  'to-lime-200',
  'to-yellow-200',
]

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: ReviewGet
  index: number
}

export const ReviewCard = ({ data, index, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-md bg-gradient-to-br from-white p-6',
        colors[index % colors.length],
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <div>
          <Image
            src={data.img?.url}
            w={55}
            alt="carousel"
            className="rounded-full"
          />
        </div>
        <div>
          <strong className="block font-medium">
            {data.fullname}
          </strong>
          <small className="text-muted-foreground">{data.occupation}</small>
        </div>
      </div>
      <div>
        <p className="mt-6 line-clamp-5 opacity-90">{data.desc}</p>
      </div>
    </div>
  )
}
