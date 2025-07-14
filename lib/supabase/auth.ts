import { supabase, IS_SUPABASE_CONFIGURED } from "./client"

const notConfiguredError = { message: "Supabase credentials are missing in preview." }

// sign-in
export const signInWithPhone = async (phone: string) => {
  if (!IS_SUPABASE_CONFIGURED) return { data: null, error: notConfiguredError }

  return supabase.auth.signInWithOtp({
    phone,
    options: { shouldCreateUser: true },
  })
}

// verify
export const verifyOtp = async (phone: string, token: string) => {
  if (!IS_SUPABASE_CONFIGURED) return { data: null, error: notConfiguredError }

  return supabase.auth.verifyOtp({ phone, token, type: "sms" })
}

// sign-out
export const signOut = async () => {
  if (!IS_SUPABASE_CONFIGURED) return { error: notConfiguredError }
  return supabase.auth.signOut()
}

// current user
export const getCurrentUser = async () => {
  if (!IS_SUPABASE_CONFIGURED) return { user: null, error: notConfiguredError }
  return supabase.auth.getUser()
}

// session
export const getSession = async () => {
  if (!IS_SUPABASE_CONFIGURED) return { session: null, error: notConfiguredError }
  return supabase.auth.getSession()
}
