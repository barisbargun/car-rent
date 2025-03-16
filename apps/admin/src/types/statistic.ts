// export type StatisticContainer = {
//   title: string
//   link: string
//   statistics: Statistic[]
// }

import { UseQueryResult } from "@repo/api/config/react-query"

// type Statistic = {
//   count: number | undefined
//   name: string
// }

export type StatisticContainer = {
  title: string
  link: string
  statistics: Statistic[]
}

type Statistic = {
  data: UseQueryResult<any[], Error>
  name: string
}
