import { arrayMove } from '@dnd-kit/sortable'
import { useSwapFooterLink } from '@repo/api/paths/footer/link/swap'
import { FooterLink } from '@repo/api/types/footer'
import { useEffect, useState } from 'react'

import { ModelVerticalList } from '@/components/shared/model-vertical-list'
import { toast } from '@/lib/toast'

import { FooterLinkCard } from './card'

type Props = {
  tabTitle: string
  data: FooterLink[]
}

export const FooterLinkGroup = ({ tabTitle, data }: Props) => {
  const [items, setItems] = useState<FooterLink[]>([])

  const { mutateAsync: mutateSwap, isPending: pendingSwap } =
    useSwapFooterLink()

  const [isAnyChange, setIsAnyChange] = useState<boolean>(false)

  useEffect(() => {
    setItems(data)
    setIsAnyChange(false)
  }, [data])

  const handlePatch = async () => {
    try {
      const idList = items?.map((item) => item.id)
      if (idList) {
        await mutateSwap({
          data: { idList },
        })
        setIsAnyChange(false)
        toast.footerLink.swap.success()
      }
    } catch {
      toast.footerLink.swap.error()
    }
  }

  const handleDragEnd = ({ active, over }: any) => {
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      setItems(arrayMove(items, oldIndex, newIndex))
      setIsAnyChange(true)
    }
  }

  return (
    <ModelVerticalList
      tabTitle={tabTitle}
      items={items}
      isAnyChange={isAnyChange}
      pendingSwap={pendingSwap}
      handlePatch={handlePatch}
      handleDragEnd={handleDragEnd}
      cardComponent={FooterLinkCard}
    />
  )
}
