import { H2 } from '@/components/global/typography'

import { SubscribeForm } from './form'

export const SubscribeView = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <H2 className="text-primary-foreground max-w-80 text-center font-bold uppercase">
        subscribe to get discounts
      </H2>
      <SubscribeForm />
    </div>
  )
}
