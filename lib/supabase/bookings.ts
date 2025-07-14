import { supabase } from "./client"
import type { Booking } from "@/lib/types"

export const createBooking = async (booking: Omit<Booking, "id" | "created_at">) => {
  const { data, error } = await supabase.from("bookings").insert(booking).select().single()

  return { data, error }
}

export const getUserBookings = async (userId: string) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: true })
    .order("time", { ascending: true })

  return { data, error }
}

export const getBookingsByDate = async (date: string) => {
  const { data, error } = await supabase.from("bookings").select("time").eq("date", date).eq("status", "booked")

  return { data, error }
}

export const cancelBooking = async (bookingId: string) => {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId)
    .select()
    .single()

  return { data, error }
}

export const getLatestBooking = async (userId: string) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "booked")
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  return { data, error }
}
