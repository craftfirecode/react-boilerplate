/**
 * lib/supabaseClient.js
 * Helper to initialize the Supabase client.
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ypvczgydigwdeefahkqn.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwdmN6Z3lkaWd3ZGVlZmFoa3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyMTY3NjQsImV4cCI6MjA0MTc5Mjc2NH0.6N6ER_e7Pjzl2zSLRL_tHiZRrqUv-A40lyIRGDJyzIY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
