import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return json({ working: true });
};

export default function Index() {
  const data = useLoaderData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
