import { SubscribeView } from '@/features/subscribe/components/view'

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
        <SubscribeView />
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
