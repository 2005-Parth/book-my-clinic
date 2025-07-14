import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-blue-600" />
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>

          <p className="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>

          <Link href="/">
            <Button className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
