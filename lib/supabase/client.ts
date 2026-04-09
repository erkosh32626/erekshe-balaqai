import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = "https://nkikxqkzyvbbuboucyjn.supabase.co"
  const supabaseKey = "sb_publishable_sAOvnhhQJEs2RJXG9aGwGA_ysnjLBF4"

  return createBrowserClient(supabaseUrl, supabaseKey)
}
