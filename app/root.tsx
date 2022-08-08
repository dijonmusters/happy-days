import { json, MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import styles from "./styles/app.css";
import supabase from "./utils/supabase";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = () => {
  return json({ env: { SUPABASE_URL, SUPABASE_ANON_KEY } });
};

export default function App() {
  const { env } = useLoaderData();
  const fetcher = useFetcher();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.access_token) {
          fetcher.submit(
            {
              accessToken: session.access_token,
            },
            {
              method: "post",
              action: "/api/auth/login",
            }
          );
        }
        if (event === "SIGNED_OUT") {
          fetcher.submit(null, {
            method: "post",
            action: "/api/auth/logout",
          });
        }
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100">
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.env = ${JSON.stringify(env)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
