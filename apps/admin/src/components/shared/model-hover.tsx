import { MODELS } from '@repo/api/config/api-paths'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@repo/ui/components/hover-card'
import { useBreakpoint } from '@repo/ui/hooks/use-breakpoint'

type Props = {
  model: MODELS
  data: [string, string | number | undefined][]
}

export const ModelHover = ({ model, data }: Props) => {
  const breakpoint = useBreakpoint()
  if (breakpoint < 4) return
  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger asChild data-testid={`${model}-hover-card`}>
        <div className="absolute left-0 top-0 h-full w-full"></div>
      </HoverCardTrigger>

      <HoverCardContent className="w-72">
        <ul className="[&>li]:mt-2">
          {data.map(([key, value]) => (
            <li key={key}>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {key}
              </p>
              <small className="line-clamp-2 text-sm font-medium">
                {value || '...'}
              </small>
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  )
}
