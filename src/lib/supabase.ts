import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL ?? ""
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) throw new Error("Faltan variables de entorno: SUPABASE_URL o SUPABASE_SERVICE_KEY")
  return createClient(url, key)
}
