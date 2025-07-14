import { Calendar, Clock, MapPin, Star, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">BookMyClinic</h1>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-4 pb-8">
        <div className="max-w-md mx-auto space-y-8">
          {/* Hero */}
          <div className="text-center space-y-6 py-8 animate-fade-in">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-10 h-10 text-blue-600" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">Book doctor appointments instantly</h2>
              <p className="text-lg text-gray-600">Without calls or queues.</p>
            </div>
            <Link href="/login">
              <Button
                size="lg"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Book Appointment
              </Button>
            </Link>
          </div>

          {/* Clinic Info Cards */}
          <div className="space-y-4">
            {/* Working Hours */}
            <Card className="rounded-2xl shadow-sm border-0 bg-white/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Working Hours</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>9:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="text-red-500">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="rounded-2xl shadow-sm border-0 bg-white/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-sm text-gray-600">
                      123 Medical Center Drive
                      <br />
                      Downtown, City 12345
                    </p>
                    <div className="mt-3 h-24 bg-gray-100 rounded-xl flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Map Placeholder</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="rounded-2xl shadow-sm border-0 bg-white/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Contact</h3>
                    <p className="text-sm text-gray-600">
                      Emergency: (555) 123-4567
                      <br />
                      General: (555) 123-4568
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 text-center">What patients say</h3>
            <div className="space-y-3">
              <Card className="rounded-2xl shadow-sm border-0 bg-white/80 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    "Super easy to book appointments. No more waiting on hold!"
                  </p>
                  <p className="text-xs text-gray-500">- Sarah M.</p>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-sm border-0 bg-white/80 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    "Love the convenience. Booked my appointment in under 2 minutes."
                  </p>
                  <p className="text-xs text-gray-500">- John D.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
