import { MODELS } from '@repo/api/config/api-paths'
import { maxItemCounts } from '@repo/api/config/max-item-counts'

type Props = {
  count?: number
  model: MODELS
}

export const ItemCounts = ({ count = 0, model }: Props) => {
  return (
    <div className="mt-3 flex items-center gap-2 max-xl:flex-col max-xl:gap-0">
      <p className="text-muted-foreground text-xs">There are {count} items.</p>
      <p className="text-muted-foreground text-xs">
        (Maximum item length is {maxItemCounts[model]})
      </p>
    </div>
  )
}
