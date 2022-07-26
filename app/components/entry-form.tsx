import { redirect } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { Entry } from "~/routes/entries";
import withAuth from "~/utils/withAuth";

type EntryFormProps = {
  entry?: Entry;
};

export const action = withAuth(async ({ supabaseClient, request }) => {
  const entry = Object.fromEntries(await request.formData());

  const { data, error } = await supabaseClient
    .from<Entry>("entries")
    .upsert(entry)
    .single();

  if (error) {
    throw error;
  }

  return redirect(`/entries/${data.id}`);
});

const EntryForm = ({ entry }: EntryFormProps) => {
  return (
    <Form className="flex flex-col" method="post">
      {entry && <input type="hidden" name="id" value={entry.id} />}
      <input
        type="text"
        name="date"
        defaultValue={entry?.date || ""}
        placeholder="Date"
      />
      <input
        type="text"
        name="title"
        defaultValue={entry?.title || ""}
        placeholder="Title"
      />
      <textarea
        name="content"
        defaultValue={entry?.content || ""}
        placeholder="Content"
      ></textarea>
      <button type="submit">Submit</button>
    </Form>
  );
};

export default EntryForm;
