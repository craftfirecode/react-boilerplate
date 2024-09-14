/**
 * lib/supabaseClient.js
 * Helper to initialize the Supabase client.
 */

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPER_URL,
  import.meta.env.VITE_SUPER_API
);
