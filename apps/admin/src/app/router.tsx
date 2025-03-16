import { REQUIRED_ROLE } from '@repo/api/config/required-role'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import {
  ErrorBoundary as AppRootErrorBoundary,
  RootLayout,
} from '@/components/layouts/root'
import { paths } from '@/config/paths'
import { ProtectedAuthRoute, ProtectedComponentRoute } from '@/lib/auth'

const routes = {
  authLogin: lazy(() => import('./routes/auth/login')),
  users: lazy(() => import('./routes/app/users/users')),
  siteConfigs: lazy(() => import('./routes/app/site-configs/site-configs')),
  dashboard: lazy(() => import('./routes/app/dashboard')),
  profile: lazy(() => import('./routes/app/profile/profile')),
  images: lazy(() => import('./routes/app/images/images')),
  carousels: lazy(() => import('./routes/app/carousels/carousels')),
  vehicles: lazy(() => import('./routes/app/vehicles/vehicles')),
  services: lazy(() => import('./routes/app/services/services')),
  reviews: lazy(() => import('./routes/app/reviews/reviews')),
  menubarTabs: lazy(() => import('./routes/app/menubar/tabs/tabs')),
  menubarVehicles: lazy(() => import('./routes/app/menubar/vehicles/vehicles')),
  footerTitles: lazy(() => import('./routes/app/footer/titles/titles')),
  footerLinks: lazy(() => import('./routes/app/footer/links/links')),
  notFound: lazy(() => import('./routes/not-found')),
}

const createAppRouter = () =>
  createBrowserRouter([
    {
      path: paths.auth.login.path,
      element: <routes.authLogin />,
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedAuthRoute>
          <RootLayout />
        </ProtectedAuthRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          path: paths.app.users.path,
          element: (
            <ProtectedComponentRoute
              checkRole={REQUIRED_ROLE.user.get}
              route={() => routes.users}
            />
          ),
        },
        {
          path: paths.app.siteConfigs.path,
          element: (
            <ProtectedComponentRoute
              checkRole={REQUIRED_ROLE.siteConfig.update}
              route={() => routes.siteConfigs}
            />
          ),
        },
        {
          path: paths.app.dashboard.path,
          element: <routes.dashboard />,
        },
        {
          path: paths.app.profile.path,
          element: <routes.profile />,
        },
        {
          path: paths.app.images.path,
          element: <routes.images />,
        },
        {
          path: paths.app.carousels.path,
          element: <routes.carousels />,
        },
        {
          path: paths.app.vehicles.path,
          element: <routes.vehicles />,
        },
        {
          path: paths.app.services.path,
          element: <routes.services />,
        },
        {
          path: paths.app.reviews.path,
          element: <routes.reviews />,
        },
        {
          path: paths.app.menubar.path,
          children: [
            {
              path: paths.app.menubarTabs.path,
              element: <routes.menubarTabs />,
            },
            {
              path: paths.app.menubarVehicles.path,
              element: <routes.menubarVehicles />,
            },
          ],
        },
        {
          path: paths.app.footer.path,
          children: [
            {
              path: paths.app.footerTitles.path,
              element: <routes.footerTitles />,
            },
            {
              path: paths.app.footerLinks.path,
              element: <routes.footerLinks />,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <routes.notFound />,
    },
  ])

export const AppRouter = () => <RouterProvider router={createAppRouter()} />
