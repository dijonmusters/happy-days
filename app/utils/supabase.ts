import { createClient } from "@supabase/supabase-js";

declare global {
  interface Window {
    env: {
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
    };
  }
  const SUPABASE_URL: string;
  const SUPABASE_ANON_KEY: string;
  const STRIPE_SECRET: string;
}

const isClient = typeof window !== "undefined";
const supabaseUrl = isClient ? window.env.SUPABASE_URL : SUPABASE_URL;
const supabaseAnonKey = isClient
  ? window.env.SUPABASE_ANON_KEY
  : SUPABASE_ANON_KEY;

export default createClient(supabaseUrl, supabaseAnonKey);
