import { ActionFunction, json, redirect } from "@remix-run/cloudflare";
import { commitSession, getSession } from "~/utils/cookies";

export const action: ActionFunction = async ({ request }) => {
  const { accessToken } = Object.fromEntries(await request.formData());
  // create session
  const session = await getSession();
  // attach accessToken
  session.set("accessToken", accessToken);
  // commit our session
  const cookieString = await commitSession(session);
  // return headers to set cookie
  // return redirect("/entries", {
  //   headers: {
  //     "Set-Cookie": cookieString,
  //   },
  // });
  return json(
    {},
    {
      headers: {
        "Set-Cookie": cookieString,
      },
    }
  );
};
