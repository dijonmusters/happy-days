import { createCookieSessionStorage } from "@remix-run/cloudflare";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "sb:token",
      maxAge: 60 * 59,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: true,
      secrets: ["supabase is the dopest!"],
    },
  });

export { getSession, commitSession, destroySession };
