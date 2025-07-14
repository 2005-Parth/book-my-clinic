export interface TimeSlot {
  time: string
  available: boolean
}

export interface Booking {
  id: string
  user_id: string
  full_name: string
  date: string
  time: string
  notes?: string | null
  status: "booked" | "cancelled" | "completed"
  created_at: string
}

export interface Profile {
  id: string
  full_name?: string | null
  phone?: string | null
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email?: string
  phone?: string
  created_at: string
}
