import { cn } from '#ui/lib/utils'

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-16 w-16',
  xl: 'h-24 w-24',
}

const variants = {
  light: 'text-white',
  primary: 'text-slate-600',
}

export type LoaderProps = {
  size?: keyof typeof sizes
  variant?: keyof typeof variants
  className?: string
}

export const Loader = ({
  size = 'md',
  variant = 'primary',
  className = '',
}: LoaderProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          'animate-spin',
          sizes[size],
          variants[variant],
          className,
        )}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <span className="sr-only">Loading</span>
    </>
  )
}

export const FullPageLoader = () => {
  return (
    <div className="flex-center fixed left-0 top-0 z-50 h-screen w-full">
      <Loader />
    </div>
  )
}
