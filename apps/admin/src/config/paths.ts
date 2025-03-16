export const paths = {
  auth: {
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/',
      getHref: () => '/',
    },
    dashboard: {
      path: '/',
      getHref: () => '/',
    },
    profile: {
      path: 'profile',
      getHref: () => '/profile',
    },
    carousels: {
      path: 'carousels',
      getHref: () => '/carousels',
    },
    menubar: {
      path: 'menubar',
      getHref: () => '/menubar',
    },
    menubarTabs: {
      path: 'tabs',
      getHref: () => '/menubar/tabs',
    },
    menubarVehicles: {
      path: 'vehicles',
      getHref: () => '/menubar/vehicles',
    },
    vehicles: {
      path: 'vehicles',
      getHref: () => '/vehicles',
    },
    services: {
      path: 'services',
      getHref: () => '/services',
    },
    reviews: {
      path: 'reviews',
      getHref: () => '/reviews',
    },
    footer: {
      path: 'footer',
      getHref: () => '/footer',
    },
    footerTitles: {
      path: 'titles',
      getHref: () => '/footer/titles',
    },
    footerLinks: {
      path: 'links',
      getHref: () => '/footer/links',
    },
    siteConfigs: {
      path: 'site-configs',
      getHref: () => '/site-configs',
    },
    images: {
      path: 'images',
      getHref: () => '/images',
    },
    users: {
      path: 'users',
      getHref: () => '/users',
    },
  },
} as const
