"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/supabase/auth"
import { getLatestBooking } from "@/lib/supabase/bookings"

export default function BookingSuccessPage() {
  const [latestBooking, setLatestBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchLatestBooking = async () => {
      const { user, error: userError } = await getCurrentUser()
      if (userError || !user) {
        router.push("/login")
        return
      }

      const { data: booking, error } = await getLatestBooking(user.id)

      if (error) {
        console.error("Error fetching booking:", error)
      }

      setLatestBooking(booking)
      setLoading(false)
    }

    fetchLatestBooking()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!latestBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No booking found</p>
          <Link href="/booking">
            <Button className="mt-4">Book Appointment</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Content */}
      <main className="px-4 py-12">
        <div className="max-w-md mx-auto space-y-8">
          {/* Success Icon */}
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
            <p className="text-gray-600">Your appointment has been successfully booked.</p>
          </div>

          {/* Appointment Details */}
          <Card className="rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur animate-fade-in">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 text-center mb-4">Appointment Details</h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-xl">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Doctor</p>
                    <p className="font-semibold">Dr. Smith</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold">
                      {new Date(latestBooking.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-xl">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-semibold">{latestBooking.time}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-xl">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Patient</p>
                    <p className="font-semibold">{latestBooking.full_name}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 animate-fade-in">
            <Link href="/my-bookings">
              <Button className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                Go to My Bookings
              </Button>
            </Link>

            <Link href="/booking">
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-gray-200 hover:bg-blue-50 bg-transparent"
              >
                Book Another
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <Card className="rounded-2xl shadow-sm border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Please arrive 15 minutes before your appointment time.</p>
              <p className="text-sm text-gray-600">For any changes, please contact us at (555) 123-4567</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
