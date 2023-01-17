import {
  redirect,
  unstable_parseMultipartFormData,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from "@remix-run/cloudflare";
import { Form, useLocation, useNavigate } from "@remix-run/react";
import { Entry } from "~/types";
import supabase from "~/utils/supabase";
import withAuth from "~/utils/withAuth";

type EntryFormProps = {
  entry?: Entry;
};

const asyncIterableToStream = (asyncIterable: AsyncIterable<Uint8Array>) => {
  console.log("inside stream");

  try {
    return new ReadableStream({
      async pull(controller) {
        for await (const entry of asyncIterable) {
          controller.enqueue(entry);
        }
        controller.close();
      },
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const action = withAuth(async ({ supabaseClient, request, user }) => {
  const uploadHandler = unstable_composeUploadHandlers(async (file) => {
    console.log("start of upload handler");
    if (file.name !== "files") {
      console.log("not a file");
      return undefined;
    }

    console.log("is a file");

    const stream = asyncIterableToStream(file.data);

    console.log("stream creation successful");

    const filepath = `${user!.id}/${file.filename}`;
    const { data, error } = await supabaseClient.storage
      .from("assets")
      .upload(filepath, stream, {
        contentType: file.contentType,
        upsert: true,
      });

    if (error) {
      throw error;
    }

    console.log("end of upload handler");

    return filepath;
  }, unstable_createMemoryUploadHandler());

  // const uploadHandler = unstable_createMemoryUploadHandler({
  //   maxPartSize: 20_000_000,
  // });

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  console.log("upload handler successful");

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

  console.log("supabase upsert successful");

  if (entryError) {
    throw entryError;
  }

  return redirect(`/entries/${entryData.id}`);
});

const EntryForm = ({ entry }: EntryFormProps) => {
  const navigate = useNavigate();
  const addEntry = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const id = formData.get("id")?.toString();
    const date = formData.get("date")?.toString();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const files = e.target.files.files;

    console.log({ files });

    const userId = supabase.auth.user()?.id;

    const filepath = `${userId}/${files[0].filename}`;

    const { data, error } = await supabase.storage
      .from("assets")
      .upload(filepath, files[0], {
        upsert: true,
      });

    console.log({ error });

    const { data: entryData, error: entryError } = await supabase
      .from<Entry>("entries")
      .upsert({
        id,
        date,
        title,
        content,
        asset_urls: [filepath],
      })
      .single();

    console.log({ entryError });

    navigate(`/entries/${entryData?.id}`);
  };

  return (
    <form
      className="flex flex-col w-full md:w-1/2 gap-8 m-4"
      onSubmit={addEntry}
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
    </form>
  );
};

export default EntryForm;
