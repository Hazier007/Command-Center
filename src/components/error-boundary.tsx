"use client"

import { Component, ReactNode } from "react"
import { ErrorState } from "./ui/error-state"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error boundary caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <ErrorState
          message={
            this.state.error?.message ||
            "Er ging iets mis. Probeer de pagina te herladen."
          }
          onRetry={() => {
            this.setState({ hasError: false, error: undefined })
            window.location.reload()
          }}
          fullScreen
        />
      )
    }

    return this.props.children
  }
}
