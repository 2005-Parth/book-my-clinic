"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, User, X, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser, signOut } from "@/lib/supabase/auth"
import { getUserBookings, cancelBooking } from "@/lib/supabase/bookings"
import type { Booking } from "@/lib/types"

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming")
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuthAndFetchBookings = async () => {
      const { user, error } = await getCurrentUser()
      if (error || !user) {
        router.push("/login")
        return
      }
      setUser(user)
      await fetchBookings(user.id)
    }
    checkAuthAndFetchBookings()
  }, [router])

  const fetchBookings = async (userId: string) => {
    setLoading(true)
    const { data, error } = await getUserBookings(userId)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        variant: "destructive",
      })
    } else {
      setBookings(data || [])
    }
    setLoading(false)
  }

  const handleCancelBooking = async (bookingId: string) => {
    const { error } = await cancelBooking(bookingId)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Booking cancelled successfully",
      })
      if (user) {
        fetchBookings(user.id)
      }
    }
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (!error) {
      router.push("/")
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(`${booking.date}T${booking.time}`)
    const now = new Date()

    if (filter === "upcoming") {
      return bookingDate >= now && booking.status === "booked"
    } else {
      return bookingDate < now || booking.status === "cancelled"
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900 ml-4">My Bookings</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="p-2">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Filter Toggle */}
          <div className="flex bg-white rounded-xl p-1 shadow-sm">
            <Button
              onClick={() => setFilter("upcoming")}
              variant={filter === "upcoming" ? "default" : "ghost"}
              className={`flex-1 h-10 rounded-lg transition-all duration-200 ${
                filter === "upcoming" ? "bg-blue-500 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Upcoming
            </Button>
            <Button
              onClick={() => setFilter("past")}
              variant={filter === "past" ? "default" : "ghost"}
              className={`flex-1 h-10 rounded-lg transition-all duration-200 ${
                filter === "past" ? "bg-blue-500 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Past
            </Button>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <Card className="rounded-2xl shadow-sm border-0 bg-white/80 backdrop-blur">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No {filter} appointments</h3>
                  <p className="text-gray-600 mb-4">
                    {filter === "upcoming"
                      ? "You don't have any upcoming appointments."
                      : "You don't have any past appointments."}
                  </p>
                  {filter === "upcoming" && (
                    <Link href="/booking">
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl">Book Appointment</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ) : (
              filteredBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="rounded-2xl shadow-sm border-0 bg-white/90 backdrop-blur animate-fade-in"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Dr. Smith</h3>
                          <p className="text-sm text-gray-600">{booking.full_name}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === "booked" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {booking.status === "booked" ? "Confirmed" : "Cancelled"}
                        </span>

                        {booking.status === "booked" && filter === "upcoming" && (
                          <Button
                            onClick={() => handleCancelBooking(booking.id)}
                            variant="ghost"
                            size="sm"
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {new Date(booking.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3 text-sm">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{booking.time}</span>
                      </div>

                      {booking.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                          <p className="text-sm text-gray-600">
                            <strong>Notes:</strong> {booking.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Book New Appointment Button */}
          {filter === "upcoming" && (
            <Link href="/booking">
              <Button className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                Book New Appointment
              </Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
