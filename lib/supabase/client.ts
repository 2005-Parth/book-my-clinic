import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co" // fallback URL for preview

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "public-anon-key" // fallback anon key for preview

// ↓ add right after the createClient import / constants
export const IS_SUPABASE_CONFIGURED = !(
  supabaseUrl.includes("placeholder.supabase.co") || supabaseAnonKey === "public-anon-key"
)

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    "[Supabase] Environment variables missing. Using placeholder credentials – authentication is disabled in preview.",
  )
}

/**
 * NOTE:
 *  • In previews this lets the UI render without crashing.
 *  • In production set NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.
 *  • Auth & DB calls will no-op with the placeholder creds.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Don’t try to persist an unusable session in preview.
    persistSession: false,
    autoRefreshToken: false,
  },
})
