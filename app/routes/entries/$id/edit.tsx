import { json, redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import { Entry } from "~/routes";
import withAuth from "~/utils/withAuth";

export const loader = withAuth(async ({ supabaseClient, params }) => {
  const { id } = params;
  const { data: entry } = await supabaseClient
    .from<Entry>("entries")
    .select("*")
    .match({ id })
    .single();

  return json({ entry });
});

export const action = withAuth(async ({ supabaseClient, request }) => {
  const entry = Object.fromEntries(await request.formData());

  const { data, error } = await supabaseClient
    .from<Entry>("entries")
    .upsert(entry)
    .single();

  return redirect(`/entries/${entry.id}`);
});

const EntryEdit = () => {
  const { entry } = useLoaderData<{ entry: Entry }>();
  return (
    <Form className="flex flex-col" method="post">
      <input type="hidden" name="id" value={entry.id} />
      <input type="text" name="title" defaultValue={entry.title || ""} />
      <textarea name="content" defaultValue={entry.content}></textarea>
      <input type="text" name="date" defaultValue={entry.date} />
      <button type="submit">Submit</button>
    </Form>
  );
};

export default EntryEdit;
