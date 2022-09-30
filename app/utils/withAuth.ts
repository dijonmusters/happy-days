import {
  ActionFunction,
  DataFunctionArgs,
  LoaderFunction,
  redirect,
} from "@remix-run/cloudflare";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { getSession } from "./cookies";
import supabase from "./supabase";

type FunctionArgs = DataFunctionArgs & {
  user: User | null;
  supabaseClient: SupabaseClient;
};
type WithAuthReturnType =
  | ReturnType<LoaderFunction>
  | ReturnType<ActionFunction>;

const withAuth =
  (
    fn: (args: FunctionArgs) => WithAuthReturnType,
    { required = true }: { required?: boolean } = {}
  ) =>
  async (context: DataFunctionArgs) => {
    const session = await getSession(context.request.headers.get("Cookie"));
    const accessToken = session.get("accessToken");
    const { user } = await supabase.auth.api.getUser(accessToken);

    if (!user && required) {
      return redirect("/login");
    }

    if (user) {
      supabase.auth.setAuth(accessToken);
    }

    return fn({
      ...context,
      user,
      supabaseClient: supabase,
    });
  };

export default withAuth;
