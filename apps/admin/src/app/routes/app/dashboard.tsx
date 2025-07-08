import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { useCurrentUser } from '@repo/api/paths/auth/current-user'
import { useCarousels } from '@repo/api/paths/carousel/get-all'
import { useFooterLinks } from '@repo/api/paths/footer/link/get-all'
import { useFooterTitles } from '@repo/api/paths/footer/title/get-all'
import { useImages } from '@repo/api/paths/image/get-all'
import { useMenubarTabs } from '@repo/api/paths/menubar/tab/get-all'
import { useMenubarVehicles } from '@repo/api/paths/menubar/vehicle/get-all'
import { useReviews } from '@repo/api/paths/review/get-all'
import { useServices } from '@repo/api/paths/service/get-all'
import { useUsers } from '@repo/api/paths/user/get-all'
import { useVehicles } from '@repo/api/paths/vehicle/get-all'

import { paths } from '@/config/paths'
import { DashboardCard } from '@/features/dashboard/components/card'

const DashboardRoute = () => {
  const { data: users } = useCurrentUser()
  const _useUsers = useUsers()
  const statistics: DashboardCard[] = [
    /** Users */
    ...(REQUIRED_ROLE.user.get(users?.role)
      ? [
          {
            title: 'Users',
            link: paths.app.users.getHref(),
            statistics: [
              {
                data: _useUsers,
                name: 'Users',
              },
            ],
          },
        ]
      : []),
    /** Carousels */
    {
      title: 'Carousels',
      link: paths.app.carousels.getHref(),
      statistics: [
        {
          data: useCarousels(),
          name: 'Carousels',
        },
      ],
    },
    /** Menubar */
    {
      title: 'Menubar',
      link: paths.app.menubarTabs.getHref(),
      statistics: [
        {
          data: useMenubarTabs(),
          name: 'Tabs',
        },
        {
          data: useMenubarVehicles(),
          name: 'Vehicles',
        },
      ],
    },
    /** Reviews, services */
    {
      title: 'Reviews, services',
      link: paths.app.reviews.getHref(),
      statistics: [
        {
          data: useReviews(),
          name: 'Reviews',
        },
        {
          data: useServices(),
          name: 'Services',
        },
      ],
    },
    /** Footer */
    {
      title: 'Footer',
      link: paths.app.footerLinks.getHref(),
      statistics: [
        {
          data: useFooterTitles(),
          name: 'Titles',
        },
        {
          data: useFooterLinks(),
          name: 'Links',
        },
      ],
    },
    /** Vehicles, Images */
    {
      title: 'Others',
      link: paths.app.vehicles.getHref(),
      statistics: [
        {
          data: useVehicles(),
          name: 'Vehicles',
        },
        {
          data: useImages(),
          name: 'Images',
        },
      ],
    },
  ]

  return (
    <div className="grid items-gap sm:grid-cols-2 xl:grid-cols-3">
      {statistics.map((statistic) => (
        <DashboardCard key={statistic.title} {...statistic} />
      ))}
    </div>
  )
}

export default DashboardRoute
