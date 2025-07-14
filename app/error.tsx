"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h1>

          <p className="text-gray-600 mb-6">We encountered an unexpected error. Please try again.</p>

          <div className="space-y-3">
            <Button
              onClick={reset}
              className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl"
            >
              Try again
            </Button>

            <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full h-12 rounded-xl">
              Go home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
