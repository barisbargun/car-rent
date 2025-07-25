import { Button } from '@repo/ui/components/button'

export const MainErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => globalThis.location.assign(globalThis.location.origin)}
      >
        Refresh
      </Button>
    </div>
  )
}
