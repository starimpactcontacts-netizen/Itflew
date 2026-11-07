import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function checkSupabase() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.getSession();
    return !error;
  } catch {
    return false;
  }
}

export default async function Home() {
  const connected = await checkSupabase();
  return (
    <main>
      <h1>itflew</h1>
      <p>
        <span className="dot" style={{ background: connected ? "#3ecf8e" : "#ef4444" }} />
        Supabase {connected ? "connected" : "not connected"}
      </p>
    </main>
  );
}
