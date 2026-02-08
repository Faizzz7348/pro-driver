import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center", sizeClasses[size], className)}>
      {/* Main spinning ring */}
      <div className="absolute inset-0 rounded-full border-[3px] border-primary/20" />
      <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-primary border-r-primary/70" />
    </div>
  )
}

export function LoadingPage({ text = "Loading" }: { text?: string } = {}) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <LoadingText text={text} />
      </div>
    </div>
  )
}

export function LoadingText({ text = "Loading" }: { text?: string }) {
  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <span className="font-medium">{text}</span>
      <span className="flex">
        <span className="animate-loading-dot animation-delay-0">.</span>
        <span className="animate-loading-dot animation-delay-200">.</span>
        <span className="animate-loading-dot animation-delay-400">.</span>
      </span>
    </div>
  )
}

// Card Loading Skeleton for content areas
export function LoadingCard() {
  return (
    <div className="space-y-4 p-6">
      <div className="space-y-3">
        <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
        <div className="h-8 w-full animate-pulse rounded bg-muted" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}

// Inline loader for buttons or small areas
export function LoadingInline({ text }: { text?: string }) {
  return (
    <div className="flex items-center gap-2">
      <LoadingSpinner size="sm" />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  )
}
