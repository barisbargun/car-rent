import { UseQueryResult } from '@repo/api/config/react-query'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'
import { Link } from 'react-router'

import { DashboardCardSkeleton } from './card.skeleton'

export type DashboardCard = {
  title: string
  link: string
  statistics: {
    data: UseQueryResult<any[], Error>
    name: string
  }[]
}

type Props = React.HTMLAttributes<HTMLDivElement> & DashboardCard

export const DashboardCard = ({
  title,
  link,
  statistics,
  className,
  ...props
}: Props) => {
  if (statistics.some((statistic) => statistic.data.isPending))
    return <DashboardCardSkeleton count={statistics.length} />
  return (
    <Card className={className} data-testid="dashboard-card" {...props}>
      <CardHeader>
        <CardTitle>
          <Link to={link}>{title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="font-inter flex-center gap-20 pb-10 pt-4">
        {statistics.map((statistic) => (
          <div
            className="flex flex-col items-center gap-2"
            key={statistic.name}
          >
            <strong className="text-5xl 2xl:text-6xl">
              {statistic.data.data?.length ?? 0}
            </strong>
            <small className="text-muted-foreground">{statistic.name}</small>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
