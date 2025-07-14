import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "public-anon-key"

export const IS_SUPABASE_CONFIGURED = !!(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !supabaseUrl.includes("placeholder.supabase.co") &&
  supabaseAnonKey !== "public-anon-key"
)

if (!IS_SUPABASE_CONFIGURED) {
  console.warn(
    "[Supabase] Environment variables missing. Using placeholder credentials – authentication is disabled in preview.",
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: IS_SUPABASE_CONFIGURED,
    autoRefreshToken: IS_SUPABASE_CONFIGURED,
  },
})
