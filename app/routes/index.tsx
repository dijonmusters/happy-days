import { json, LoaderFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { User } from "@supabase/supabase-js";
import supabase from "~/utils/supabase";
import withAuth from "~/utils/withAuth";

export type Entry = {
  id: string;
  created_at: string;
  title: string | null;
  content: string;
  date: string;
  user_id: string;
};

export const loader: LoaderFunction = withAuth(
  async ({ supabaseClient, user }) => {
    const { data: entries } = await supabaseClient.from("entries").select("*");
    return json({ entries, user });
  }
);

export default function Index() {
  const { entries, user } = useLoaderData<{ entries: Entry[]; user: User }>();

  return (
    <>
      {user && <button onClick={() => supabase.auth.signOut()}>Logout</button>}
      {!user && (
        <button onClick={() => supabase.auth.signIn({ provider: "github" })}>
          Login
        </button>
      )}
      {entries.map((entry) => (
        <div key={entry.id}>
          <Link to={`/entries/${entry.id}`}>{entry.title}</Link>
        </div>
      ))}
    </>
  );
}
