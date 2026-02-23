import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
  fullScreen?: boolean
  className?: string
}

export function ErrorState({
  message = "Er is iets misgegaan",
  onRetry,
  fullScreen = false,
  className,
}: ErrorStateProps) {
  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-4 text-center", className)}>
      <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-4">
        <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">Oeps!</h3>
        <p className="text-muted-foreground max-w-md">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Opnieuw proberen
        </Button>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-background to-background dark:from-orange-950/25 dark:via-background dark:to-background">
        <div className="flex items-center justify-center h-screen">
          {content}
        </div>
      </div>
    )
  }

  return <div className="py-12">{content}</div>
}
