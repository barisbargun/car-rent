import assets from '@/assets'

import { Navbar } from '../global/navbar'

type Props = {
  children: React.ReactNode
}

export const RootLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main className="z-10 flex min-h-screen w-full flex-col">{children}</main>
      <img
        src={assets.pattern}
        alt="pattern"
        className="fixed h-screen w-screen opacity-40"
      />
    </>
  )
}
