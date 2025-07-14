import { supabase, IS_SUPABASE_CONFIGURED } from "./client"
import type { Booking } from "@/lib/types"

const notConfiguredError = { message: "Supabase credentials are missing in preview." }

export const createBooking = async (booking: Omit<Booking, "id" | "created_at">) => {
  if (!IS_SUPABASE_CONFIGURED) return { data: null, error: notConfiguredError }

  const { data, error } = await supabase.from("bookings").insert(booking).select().single()
  return { data, error }
}

export const getUserBookings = async (userId: string) => {
  if (!IS_SUPABASE_CONFIGURED) return { data: [], error: notConfiguredError }

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: true })
    .order("time", { ascending: true })

  return { data, error }
}

export const getBookingsByDate = async (date: string) => {
  if (!IS_SUPABASE_CONFIGURED) return { data: [], error: notConfiguredError }

  const { data, error } = await supabase.from("bookings").select("time").eq("date", date).eq("status", "booked")
  return { data, error }
}

export const cancelBooking = async (bookingId: string) => {
  if (!IS_SUPABASE_CONFIGURED) return { data: null, error: notConfiguredError }

  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId)
    .select()
    .single()

  return { data, error }
}

export const getLatestBooking = async (userId: string) => {
  if (!IS_SUPABASE_CONFIGURED) return { data: null, error: notConfiguredError }

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
