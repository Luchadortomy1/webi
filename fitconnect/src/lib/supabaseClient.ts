import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://asepjaidwuzkxdtczbqj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzZXBqYWlkd3V6a3hkdGN6YnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NzkxMDUsImV4cCI6MjA4NDQ1NTEwNX0.CkU_mJV9j5fUbi7XJ6BVwRK_5WPs0fqKLRfgrNLHrVw'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase env vars missing: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
