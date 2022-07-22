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
    <div className="w-full min-h-screen flex items-center justify-center">
      <button
        className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded"
        onClick={handleSignIn}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;
