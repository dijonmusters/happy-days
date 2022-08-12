import { json, LoaderFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { User } from "@supabase/supabase-js";
import withAuth from "~/utils/withAuth";
import Navigation from "~/components/navigation";
import { Entry } from "~/types";

export const loader: LoaderFunction = withAuth(
  async ({ supabaseClient, user }) => {
    const { data } = await supabaseClient
      .from<Entry>("entries")
      .select("*")
      .order("date", { ascending: false });

    const assetUrls =
      data?.map((entry) => entry.asset_urls[0]).filter(Boolean) ?? [];

    const { data: signedUrls, error } = await supabaseClient.storage
      .from("assets")
      .createSignedUrls(assetUrls, 300);

    const signedObj = Object.fromEntries(
      signedUrls?.map((url) => [url.path, url.signedURL]) ?? []
    );

    const entries =
      data?.map((entry) => ({
        ...entry,
        asset_urls: [
          entry.asset_urls.map((url) => signedObj[url] ?? url)[0],
        ].filter(Boolean),
      })) ?? [];

    return json({ entries, user });
  }
);

export default function EntriesList() {
  const { entries } = useLoaderData<{ entries: Entry[]; user: User }>();

  console.log({ entries });

  return (
    <>
      <Navigation />
      <div className="container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-2 md:p-0">
        <div className="md:col-start-1 md:col-span-2 lg:col-start-1 lg:col-span-2 order-2 lg:order-none">
          {entries.map((entry) => (
            <Link
              to={`/entries/${entry.id}`}
              className="flex flex-col items-center bg-white hover:bg-gray-50 rounded border md:flex-row md:max-w-full mt-2 shadow-sm relative"
              key={entry.id}
            >
              <img
                className="object-cover w-full h-36 rounded-t md:h-auto md:w-24 md:rounded-none md:rounded-l"
                src={
                  entry.asset_urls[0] ??
                  "https://images.unsplash.com/photo-1574629173115-01ba37282238?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1076&q=80"
                }
                alt=""
              ></img>
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="text-2xl font-bold text-blue-400">
                  {entry.title}
                </h5>
                <p className="text-gray-700">{entry.content}</p>
              </div>
              <p className="absolute bottom-0 right-0 text-gray-500 text-sm m-2 hidden md:block">
                {entry.date}
              </p>
            </Link>
          ))}
        </div>
        <div className="md:col-start-3 md:col-span-1 lg:col-start-3 lg:col-span-1 order-1 lg:order-none">
          <Link
            to="new"
            className="bg-slate-600 hover:bg-gray-800 text-white text-center flex rounded-sm px-6 py-3 duration-200 transition-color mt-2"
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
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            Add New Entry
          </Link>

          <div className="hidden md:flex md:flex-col space-y-2 mt-3 p-4 w-full bg-white shadow-sm">
            <div className="text-xl">
              Enjoying <span className="text-pink-400">Happy</span>{" "}
              <span className="text-blue-400">Days</span>?
            </div>
            <div className="text-gray-500 text-sm">
              Our paid plans give you access to a dedicated Account Manager,
              unlocks premium features and much more.
            </div>
            <Link
              to="/"
              className="px-4 py-2 border border-pink-400 hover:bg-pink-400 text-pink-400 hover:text-white rounded text-center"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
