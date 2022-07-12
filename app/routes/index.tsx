import { json, LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { getSession } from "~/utils/cookies";
import supabase from "~/utils/supabase";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");

  supabase.auth.setAuth(accessToken);

  const { data: entries } = await supabase.from("entries").select("*");
  return json({ entries });
};

type ContextUser = {
  user: User | null;
};

export default function Index() {
  const { user } = useOutletContext<ContextUser>();
  console.log({ user });
  const { entries } = useLoaderData();

  return (
    <>
      <button onClick={() => supabase.auth.signOut()}>Logout</button>
      <button onClick={() => supabase.auth.signIn({ provider: "github" })}>
        Login
      </button>
      <pre>{JSON.stringify(entries, null, 2)}</pre>
    </>
  );
}
