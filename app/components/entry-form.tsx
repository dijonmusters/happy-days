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
    <Form className="flex flex-col w-full md:w-1/2 gap-8 m-4" method="post">
      {entry && <input type="hidden" name="id" value={entry.id} />}
      <div className="relative">
          <input
            className="peer placeholder-transparent p-3 border border-slate-600 rounded-sm shadow-md focus:outline-none w-full"
            type="text"
            name="date"
            defaultValue={entry?.date || ""}
            placeholder="Date"
          />
          <label className="absolute -top-3 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-500 peer-focus:-top-3 pointer-events-none" htmlFor="Date">Date</label>
      </div>
      <div className="relative">
          <input
            className="peer placeholder-transparent p-3 border border-slate-600 rounded-sm shadow-md focus:outline-none w-full"
            type="text"
            name="title"
            defaultValue={entry?.title || ""}
            placeholder="Title"
          />
          <label className="absolute -top-3 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-500 peer-focus:-top-3 pointer-events-none" htmlFor="Title">Title</label>
      </div>
      <div className="relative">
        <textarea
          className="h-32 peer placeholder-transparent p-3 border border-slate-600 rounded-sm shadow-md focus:outline-none w-full resize-none"
          name="content"
          defaultValue={entry?.content || ""}
          placeholder="Content"
        ></textarea>
        <label className="absolute -top-3 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-500 peer-focus:-top-3 pointer-events-none" htmlFor="Content">Content</label>
      </div>
      <button type="submit" className="px-6 py-3 rounded-sm bg-slate-600 hover:bg-gray-800 text-white uppercase w-full">Submit</button>
    </Form>
  );
};

export default EntryForm;
