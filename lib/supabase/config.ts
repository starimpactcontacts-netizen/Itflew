// Public values (safe to ship to the browser). Env vars override them.
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://cygkzsmrchvoeceukfkf.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_0Efwmlm1ziou0CXG8de-6A_fDhThl_w";
