export interface Booking {
  id: string
  user_id: string
  full_name: string
  date: string
  time: string
  notes?: string
  status: "booked" | "cancelled"
  created_at: string
}

export interface TimeSlot {
  time: string
  available: boolean
}

export interface User {
  id: string
  phone?: string
  email?: string
}
