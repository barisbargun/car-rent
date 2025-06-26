import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select'
import { UseFormReturn } from 'react-hook-form'

import { useVehicleContext } from '../lib/context'

type Props = {
  form: UseFormReturn<any>
}
export const FormBrandField = ({ form }: Props) => {
  const { menubarTabs, menubarVehiclesByMenubarTab } = useVehicleContext()
  return (
    <FormField
      control={form.control}
      name="menubarVehicle"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Brand</FormLabel>
          <Select value={field.value.toString()} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a brand" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {menubarTabs?.map((tab) => {
                const menubarVehicles = menubarVehiclesByMenubarTab.get(tab.id)
                if (!menubarVehicles?.length) return
                return (
                  <SelectGroup key={tab.id}>
                    <SelectLabel>{tab.title}</SelectLabel>
                    {menubarVehicles.map((mv) => (
                      <SelectItem key={mv.id} value={mv.id}>
                        {mv.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
