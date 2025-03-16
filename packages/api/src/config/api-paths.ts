const modelsApiPaths = {
  image: 'images',
  user: 'users',
  siteConfig: 'site-configs',
  carousel: 'carousels',
  vehicle: 'vehicles',
  service: 'services',
  review: 'reviews',
  menubarTab: 'menubar/tabs',
  menubarVehicle: 'menubar/vehicles',
  footerTitle: 'footer/titles',
  footerLink: 'footer/links',
}

export const API_PATHS = {
  ...modelsApiPaths,
  menubarPopulated: 'menubar/populated',
  footerPopulated: 'footer/populated',

  // Auth
  login: 'auth/login',
  currentUser: 'auth/current-user',
  refreshAccessToken: 'auth/refresh',
  logout: 'auth/logout',
} as const satisfies Record<string, string>

export type MODELS = keyof typeof modelsApiPaths
