import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Entry } from "~/routes/entries";
import withAuth from "~/utils/withAuth";
import EntryForm from "~/components/entry-form";

export { action } from "~/components/entry-form";

export const loader = withAuth(async ({ supabaseClient, params }) => {
  const { id } = params;
  const { data: entry } = await supabaseClient
    .from<Entry>("entries")
    .select("*")
    .match({ id })
    .single();

  return json({ entry });
});

const EntryEdit = () => {
  const { entry } = useLoaderData<{ entry: Entry }>();
  return <EntryForm entry={entry} />;
};

export default EntryEdit;
