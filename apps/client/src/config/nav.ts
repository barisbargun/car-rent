type NavLinks = 'explore' | 'service' | 'reviews'

type NavLinkConfig = {
  name: string
  title: string
  link: NavLinks
}

const navLinkConfig = {
  explore: { name: 'Explore', title: 'Explore', link: 'explore' },
  service: { name: 'Services', title: 'Our Services', link: 'service' },
  reviews: { name: 'Reviews', title: 'Client Reviews', link: 'reviews' },
} satisfies Record<string, NavLinkConfig>

export { navLinkConfig }
