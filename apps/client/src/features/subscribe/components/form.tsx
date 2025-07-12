import { Button } from '@repo/ui/components/button'

export const SubscribeForm = () => {
  return (
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
  )
}
