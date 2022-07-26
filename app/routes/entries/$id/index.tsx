import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";
import withAuth from "~/utils/withAuth";
import { Entry } from "../../";

export const loader = withAuth(async ({ supabaseClient, params }) => {
  const { id } = params;
  const { data: entry } = await supabaseClient
    .from<Entry>("entries")
    .select("*")
    .match({ id })
    .single();

  return json({ entry });
});

const EntryDetail = () => {
  const { entry } = useLoaderData<{ entry: Entry }>();
  return (
    <div>
      <Link to="edit">Edit</Link>
      <p>{entry.date}</p>
      <h1>{entry.title}</h1>
      <p>{entry.content}</p>
    </div>
  );
};

export default EntryDetail;
