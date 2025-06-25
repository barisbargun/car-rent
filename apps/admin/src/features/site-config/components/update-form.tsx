import { zodResolver } from '@hookform/resolvers/zod'
import {
  updateSiteConfigInputSchema,
  useUpdateSiteConfig,
} from '@repo/api/paths/site-config/update'
import { SiteConfigGet } from '@repo/api/types/site-config'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form'
import { Input } from '@repo/ui/components/input'
import { Textarea } from '@repo/ui/components/textarea'
import { cn } from '@repo/ui/lib/utils'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ButtonAlertUpdate } from '@/components/shared/buttons/alert-update'
import { ImageFormField } from '@/features/image/components/form-field'
import { useBreakpoint } from '@repo/ui/hooks/use-breakpoint'
import { toast } from '@/lib/toast'
import { DialogPropsPartial } from '@/types/dialog'

type Props = React.HTMLAttributes<HTMLFormElement> &
  DialogPropsPartial & {
    siteConfig?: SiteConfigGet
  }

export const SiteConfigUpdateForm = ({
  siteConfig,
  closeDialog,
  className,
  ...props
}: Props) => {
  const { mutateAsync, isPending } = useUpdateSiteConfig()
  const breakpoint = useBreakpoint()
  const isDesktop = breakpoint > 2

  const form = useForm<z.infer<typeof updateSiteConfigInputSchema>>({
    resolver: zodResolver(updateSiteConfigInputSchema),
    defaultValues: {
      logoImg: siteConfig?.logoImg?.id || '',
      serviceImg: siteConfig?.serviceImg?.id || '',
      title: siteConfig?.title || '',
      desc: siteConfig?.desc || '',
    },
  })

  async function onSubmit(values: z.infer<typeof updateSiteConfigInputSchema>) {
    try {
      await mutateAsync({
        data: values,
      })
      toast.siteConfig.update.success()

      closeDialog?.()
    } catch {
      toast.siteConfig.update.error()
    }
  }

  const desktop = (
    <div className="mb-10 flex justify-between gap-14">
      {/* Title and description section */}
      <div className="flex max-w-[50%] flex-1 flex-col gap-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="name"
                  placeholder="Enter title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  className="custom-scrollbar"
                  placeholder="Enter description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* Image upload section and images */}
      <div className="flex flex-col items-end gap-10">
        <ImageFormField
          form={form}
          formName="logoImg"
          initialImage={siteConfig?.logoImg?.url}
          image={{
            alt: 'logo',
          }}
          button={{
            buttonText: 'Change logo image',
            buttonIconType: 'EDIT',
          }}
          className="justify-between"
        />

        <ImageFormField
          form={form}
          formName="serviceImg"
          initialImage={siteConfig?.serviceImg?.url}
          image={{
            alt: 'service',
          }}
          button={{
            buttonText: 'Change service image',
            buttonIconType: 'EDIT',
          }}
          className="justify-between"
        />
      </div>
    </div>
  )

  const mobile = (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                type="text"
                autoComplete="name"
                placeholder="Enter title"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="desc"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                rows={4}
                className="custom-scrollbar"
                placeholder="Enter description"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <ImageFormField
        form={form}
        formName="logoImg"
        initialImage={siteConfig?.logoImg?.url}
        image={{
          alt: 'logo',
        }}
        button={{
          buttonText: 'Change logo image',
          buttonIconType: 'EDIT',
        }}
        className="justify-between"
      />

      <ImageFormField
        form={form}
        formName="serviceImg"
        initialImage={siteConfig?.serviceImg?.url}
        image={{
          alt: 'service',
        }}
        button={{
          buttonText: 'Change service image',
          buttonIconType: 'EDIT',
        }}
        className="justify-between"
      />
    </>
  )

  return (
    <Form {...form}>
      <form
        className={cn('w-full', !isDesktop && 'flex flex-col gap-5', className)}
        {...props}
      >
        {isDesktop ? desktop : mobile}

        <ButtonAlertUpdate
          handleUpdate={form.handleSubmit(onSubmit)}
          isPending={isPending}
        />
      </form>
    </Form>
  )
}
