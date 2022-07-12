import { json } from "@remix-run/cloudflare";
import supabase from "~/utils/supabase";

export const loader = async () => {
  return json({ working: true });
};

const Login = () => {
  const handleSignIn = async () => {
    const resp = await supabase.auth.signIn({
      provider: "github",
    });

    console.log({ resp });
  };

  return (
    <button
      className="bg-green-200 border border-red-500 px-4 py-2"
      onClick={handleSignIn}
    >
      Login with GitHub
    </button>
  );
};

export default Login;
