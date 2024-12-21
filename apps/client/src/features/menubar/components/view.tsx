import { Vehicle } from '@repo/typescript-config/types/api'
import { Button } from '@repo/ui/components/button'
import { cn } from '@repo/ui/lib/utils'
import { SlidersHorizontal } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'

import { useMenubar } from '../api/get'
import { Menubar } from './menubar'
import { Paginator } from './paginator'
import { VehicleCard } from './vehicle-card'

type Props = React.HTMLAttributes<HTMLDivElement> & {}

const count = 6
export const MenubarView = ({ className, ...props }: Props) => {
  const { data, isSuccess } = useMenubar({})
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState(0)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1)
    setCategory(Number(searchParams.get('category')) || 0)
  }, [searchParams])

  const getVehicleData = useMemo(() => {
    if (!isSuccess) return
    const allVehicles: Vehicle[] = []
    if (category == 0) {
      const vehicles = data.flatMap((tab) =>
        tab.menubarVehicles.flatMap((vehicle) => vehicle.vehicles),
      )
      allVehicles.push(...vehicles)
    } else {
      data.map((a) =>
        a.menubarVehicles.map(
          (b) =>
            b.index == category && b.vehicles.map((c) => allVehicles.push(c)),
        ),
      )
    }
    return allVehicles
  }, [category, data, isSuccess])

  if (!isSuccess) return
  return (
    <div
      className={cn('pageWidth z-20 flex-col flex-center', className)}
      {...props}
    >
      <div className="gap-2 flex-center max-md:flex-col">
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="size-4" />
        </Button>
        <Menubar data={data} />
      </div>
      <div className="my-10 grid w-full grid-cols-3 gap-8 max-xl:grid-cols-2 max-md:grid-cols-1">
        {getVehicleData
          ?.slice((page - 1) * count, page * count)
          .sort((a, b) => a.index - b.index)
          .map((v) => <VehicleCard data={v} key={v.id} />)}
      </div>
      <Paginator
        length={Math.round(getVehicleData ? getVehicleData.length / count : 1)}
      />
    </div>
  )
}
