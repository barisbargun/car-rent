import { Button } from '@repo/ui/components/button'

import { PageHeader } from '../components/global/page-header'
import { PageSection } from '../components/global/page-section'
import { navLinkConfig } from '../config/nav'
import { CarouselView } from '../features/carousel/components/view'
import { FooterView } from '../features/footer/components/view'
import { MenubarView } from '../features/menubar/components/view'
import { ReviewView } from '../features/review/components/view'
import { ServiceView } from '../features/service/components/view'

export const App = () => {
  return (
    <>
      {/** Home */}
      <CarouselView />

      {/** Menubar */}
      <PageSection id={navLinkConfig.explore.link}>
        <PageHeader>{navLinkConfig.explore.title}</PageHeader>
        <MenubarView />
      </PageSection>

      {/** Service */}
      <PageSection id={navLinkConfig.service.link}>
        <PageHeader>{navLinkConfig.service.title}</PageHeader>
        <ServiceView />
      </PageSection>

      {/** Subscribe */}
      <PageSection className="bg-primary">
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-primary-foreground max-w-80 text-balance text-center text-3xl font-bold uppercase tracking-wider">
            subscribe to get discounts
          </h2>
          <form
            className="flex items-center gap-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-md border border-gray-300 p-2 lg:w-80"
            />
            <Button variant="destructive" type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </PageSection>

      {/** Reviews */}
      <PageSection id={navLinkConfig.reviews.link}>
        <PageHeader>{navLinkConfig.reviews.title}</PageHeader>
        <ReviewView />
      </PageSection>

      {/** Footer */}
      <PageSection className="bg-slate-950 text-white">
        <FooterView />
      </PageSection>
    </>
  )
}
