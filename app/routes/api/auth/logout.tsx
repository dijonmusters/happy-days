import { ActionFunction, redirect } from "@remix-run/cloudflare";
import { destroySession, getSession } from "~/utils/cookies";

export const action: ActionFunction = async ({ request }) => {
  // get session from headers
  const session = await getSession(request.headers.get("Cookie"));
  // destroy session
  const cookieString = await destroySession(session);
  // redirect to login
  return redirect("/login", {
    headers: {
      "Set-Cookie": cookieString,
    },
  });
};
