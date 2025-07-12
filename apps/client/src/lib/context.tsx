import { CachedGet } from '@repo/api/paths/cached/common'
import { useCached } from '@repo/api/paths/cached/get-all'
import { createContext, ReactNode, useContext } from 'react'

const Context = createContext<CachedGet>(undefined!)

export const AppContextProvider = ({
  children,
  Skeleton,
}: {
  children: ReactNode
  Skeleton: React.ComponentType
}) => {
  const { data: cached, isPending } = useCached()

  if (isPending) return <Skeleton />
  if (!cached) {
    return (
      <div className="flex-center text-muted-foreground h-screen w-full flex-col">
        <p>An error happened.</p>
        <p>Please try again later.</p>
      </div>
    )
  }

  return <Context.Provider value={cached}>{children}</Context.Provider>
}

export const useAppContext = () => useContext(Context)
