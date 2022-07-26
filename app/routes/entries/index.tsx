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

export default function EntriesList() {
  const { entries } = useLoaderData<{ entries: Entry[]; user: User }>();

  return (
    <>
      <button onClick={() => supabase.auth.signOut()}>Logout</button>
      <Link to="new">New entry</Link>
      {entries.map((entry) => (
        <div key={entry.id}>
          <Link to={`/entries/${entry.id}`}>{entry.title}</Link>
        </div>
      ))}
    </>
  );
}
