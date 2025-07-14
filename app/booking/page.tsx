"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Calendar, Clock, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser, signOut } from "@/lib/supabase/auth"
import { createBooking, getBookingsByDate } from "@/lib/supabase/bookings"
import type { TimeSlot } from "@/lib/types"

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [fullName, setFullName] = useState("")
  const [notes, setNotes] = useState("")
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()

  // Generate next 7 days
  const generateDates = () => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const dates = generateDates()

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const { user, error } = await getCurrentUser()
      if (error || !user) {
        router.push("/login")
        return
      }
      setUser(user)
    }
    checkAuth()
  }, [router])

  // Load time slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      loadTimeSlots(selectedDate)
    }
  }, [selectedDate])

  const loadTimeSlots = async (date: string) => {
    // Generate time slots (9 AM to 6 PM, 30-minute intervals)
    const slots: TimeSlot[] = []
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push({ time, available: true })
      }
    }

    // Check existing bookings for this date
    const { data: bookings } = await getBookingsByDate(date)

    // Mark booked slots as unavailable
    if (bookings) {
      bookings.forEach((booking) => {
        const slot = slots.find((s) => s.time === booking.time)
        if (slot) slot.available = false
      })
    }

    setTimeSlots(slots)
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const formatDisplayDate = (date: Date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow"
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    }
  }

  const handleConfirmBooking = async () => {
    if (!fullName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const { error } = await createBooking({
        user_id: user.id,
        full_name: fullName,
        date: selectedDate,
        time: selectedTime,
        notes: notes || null,
        status: "booked",
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Appointment booked successfully!",
      })

      router.push("/booking-success")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to book appointment",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setShowConfirmModal(false)
    }
  }

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (!error) {
      router.push("/")
    }
  }

  if (!user) {
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
            <h1 className="text-xl font-semibold text-gray-900 ml-4">Book an Appointment</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut} className="p-2">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Date Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Select Date
            </h2>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {dates.map((date) => {
                const dateStr = formatDate(date)
                const isSelected = selectedDate === dateStr
                return (
                  <Button
                    key={dateStr}
                    onClick={() => {
                      setSelectedDate(dateStr)
                      setSelectedTime("")
                    }}
                    variant={isSelected ? "default" : "outline"}
                    className={`min-w-[80px] h-16 flex-col rounded-xl transition-all duration-200 ${
                      isSelected ? "bg-blue-500 text-white shadow-lg" : "bg-white hover:bg-blue-50 border-gray-200"
                    }`}
                  >
                    <span className="text-xs font-medium">{formatDisplayDate(date)}</span>
                    <span className="text-lg font-bold">{date.getDate()}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Available Times
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    className={`h-12 rounded-xl transition-all duration-200 ${
                      selectedTime === slot.time
                        ? "bg-blue-500 text-white shadow-lg"
                        : slot.available
                          ? "bg-white hover:bg-blue-50 border-gray-200"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Booking Form */}
          {selectedTime && (
            <Card className="rounded-2xl shadow-sm border-0 bg-white/90 backdrop-blur animate-fade-in">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Patient Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <Input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="h-12 rounded-xl border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes to Doctor (Optional)</label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific concerns or symptoms..."
                      className="rounded-xl border-gray-200 focus:border-blue-500 resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                <Button
                  onClick={() => setShowConfirmModal(true)}
                  disabled={!fullName.trim()}
                  className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Confirm Appointment
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="max-w-sm mx-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold">Confirm Appointment</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-blue-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Doctor:</span>
                <span className="font-semibold">Dr. Smith</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">
                  {new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Patient:</span>
                <span className="font-semibold">{fullName}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setShowConfirmModal(false)} className="flex-1 h-12 rounded-xl">
                Cancel
              </Button>
              <Button
                onClick={handleConfirmBooking}
                disabled={loading}
                className="flex-1 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
              >
                {loading ? "Booking..." : "Confirm"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
