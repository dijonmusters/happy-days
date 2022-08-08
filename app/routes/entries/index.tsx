import { json, LoaderFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { User } from "@supabase/supabase-js";
import withAuth from "~/utils/withAuth";
import Navigation from "~/components/navigation";

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
      <Navigation/>
      <Link to="new">New entry</Link>
      {entries.map((entry) => (
        <div key={entry.id}>
          <Link to={`/entries/${entry.id}`}>{entry.title}</Link>
        </div>
      ))}
    </>
  );
}
