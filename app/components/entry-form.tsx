import {
  redirect,
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { Entry } from "~/types";
import withAuth from "~/utils/withAuth";

type EntryFormProps = {
  entry?: Entry;
};

const asyncIterableToStream = (asyncIterable: AsyncIterable<Uint8Array>) => {
  return new ReadableStream({
    async pull(controller) {
      for await (const entry of asyncIterable) {
        controller.enqueue(entry);
      }
      controller.close();
    },
  });
};

export const action = withAuth(async ({ supabaseClient, request, user }) => {
  const uploadHandler = unstable_composeUploadHandlers(async (file) => {
    if (file.name !== "files") {
      return undefined;
    }

    const stream = asyncIterableToStream(file.data);

    const filepath = `${user.id}/${file.filename}`;
    const { data, error } = await supabaseClient.storage
      .from("assets")
      .upload(filepath, stream, {
        contentType: file.contentType,
        upsert: true,
      });

    if (error) {
      throw error;
    }

    return filepath;
  }, unstable_createMemoryUploadHandler());

  // const uploadHandler = unstable_createMemoryUploadHandler({
  //   maxPartSize: 20_000_000,
  // });

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const id = formData.get("id")?.toString();
  const date = formData.get("date")?.toString();
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const filePaths = formData.getAll("files").map((file) => file.toString());

  const { data: entryData, error: entryError } = await supabaseClient
    .from<Entry>("entries")
    .upsert({
      id,
      date,
      title,
      content,
      asset_urls: filePaths,
    })
    .single();

  if (entryError) {
    throw entryError;
  }

  return redirect(`/entries/${entryData.id}`);
});

const EntryForm = ({ entry }: EntryFormProps) => {
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
