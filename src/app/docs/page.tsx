"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DocsRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/research?type=governance")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Doorsturen naar Research...</p>
    </div>
  )
}
