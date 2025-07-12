import { Button } from '@repo/ui/components/button'

export const MainErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <strong className="text-lg">Ooops, something went wrong :( </strong>
      <Button
        className="mt-4"
        onClick={() => globalThis.location.assign(globalThis.location.origin)}
      >
        Refresh
      </Button>
    </div>
  )
}
