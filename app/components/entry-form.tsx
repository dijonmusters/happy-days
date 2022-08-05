import { redirect } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { Entry } from "~/routes/entries";
import supabase from "~/utils/supabase";
import withAuth from "~/utils/withAuth";

type EntryFormProps = {
  entry?: Entry;
};

export const action = withAuth(async ({ supabaseClient, request, user }) => {
  const entry = Object.fromEntries(await request.formData());

  const { data: entryData, error: entryError } = await supabaseClient
    .from<Entry>("entries")
    .upsert(entry)
    .single();

  if (entryError) {
    throw entryError;
  }

  // const { data: storageData, error: storageError } =
  //   await supabaseClient.storage
  //     .from("assets")
  //     .upload(`${user.id}/${entryData.id}/${files[0].filename}`, files[0]);

  // if (storageError) {
  //   throw storageError;
  // }

  console.log({ entryData });

  return redirect(`/entries/${entryData.id}`);
});

const EntryForm = ({ entry }: EntryFormProps) => {
  const onUpload = async (e) => {
    const user = supabase.auth.user();

    if (!user) {
      return;
    }

    const { data, error } = await supabase.storage
      .from("assets")
      .upload(`${user.id}/test/${e.target.files[0].name}`, e.target.files[0], {
        contentType: e.target.files[0].type,
      });

    console.log({ error, data });
  };

  return (
    <Form
      className="flex flex-col w-full md:w-1/2 gap-8 m-4"
      method="post"
      encType="multipart/form-data"
    >
      {entry && <input type="hidden" name="id" value={entry.id} />}
      <div className="relative">
        <input
          className="peer placeholder-transparent p-3 border border-slate-600 rounded-sm shadow-md focus:outline-none w-full"
          type="text"
          name="date"
          defaultValue={entry?.date || ""}
          placeholder="Date"
        />
        <label
          className="absolute -top-3 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-500 peer-focus:-top-3 pointer-events-none"
          htmlFor="Date"
        >
          Date
        </label>
      </div>
      <div className="relative">
        <input
          className="peer placeholder-transparent p-3 border border-slate-600 rounded-sm shadow-md focus:outline-none w-full"
          type="text"
          name="title"
          defaultValue={entry?.title || ""}
          placeholder="Title"
        />
        <label
          className="absolute -top-3 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-500 peer-focus:-top-3 pointer-events-none"
          htmlFor="Title"
        >
          Title
        </label>
      </div>
      <div className="relative">
        <textarea
          className="h-32 peer placeholder-transparent p-3 border border-slate-600 rounded-sm shadow-md focus:outline-none w-full resize-none"
          name="content"
          defaultValue={entry?.content || ""}
          placeholder="Content"
        ></textarea>
        <label
          className="absolute -top-3 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-500 peer-focus:-top-3 pointer-events-none"
          htmlFor="Content"
        >
          Content
        </label>
      </div>
      <div className="relative">
        <input
          className="peer placeholder-transparent p-3 border border-slate-600 rounded-sm shadow-md focus:outline-none w-full"
          type="file"
          multiple={true}
          name="files"
          onChange={onUpload}
        />
        <label
          className="absolute -top-3 left-2 -translate-y-1/2 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-500 peer-focus:-top-3 pointer-events-none"
          htmlFor="files"
        >
          Upload files 😬
        </label>
      </div>
      <button
        type="submit"
        className="px-6 py-3 rounded-sm bg-slate-600 hover:bg-gray-800 text-white uppercase w-full"
      >
        Submit
      </button>
    </Form>
  );
};

export default EntryForm;
