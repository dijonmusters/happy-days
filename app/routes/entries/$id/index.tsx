import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";
import withAuth from "~/utils/withAuth";
import { Entry } from "~/types";
import Navigation from "~/components/navigation";

export const loader = withAuth(async ({ supabaseClient, params }) => {
  const { id } = params;
  const { data } = await supabaseClient
    .from<Entry>("entries")
    .select("*")
    .match({ id })
    .single();

  if (!data) {
    throw new Response("Not found", {
      status: 404,
    });
  }

  if (data.asset_urls.length === 0) {
    return json({ entry: data });
  }

  const { data: assetUrls, error } = await supabaseClient.storage
    .from("assets")
    .createSignedUrls(data.asset_urls, 300);

  if (error) {
    throw new Response(error.message, {
      status: 500,
    });
  }

  const entry = { ...data, asset_urls: assetUrls?.map((url) => url.signedURL) };

  return json({
    entry,
  });
});

const EntryDetail = () => {
  const { entry } = useLoaderData<{ entry: Entry }>();
  console.log({ entry });
  return (
    <>
      <Navigation />
      <div className="w-full flex flex-col items-center justify-center p-2">
        <Link to="/entries">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 text-gray-500 cursor-pointer hover:text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Link>
        <div className=" w-full md:w-1/2 bg-white rounded border border-gray-200 shadow-sm m-4">
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold text-blue-400">
              {entry.title}
            </h5>
            <p className="mb-2 font-normal text-gray-700">{entry.content}</p>
            {entry.asset_urls.map((url) => (
              <img key={url} src={url} />
            ))}
            <Link
              to="edit"
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-slate-600 rounded hover:bg-slate-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EntryDetail;
