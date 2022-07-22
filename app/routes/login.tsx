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
        className="bg-gray-700 hover:bg-gray-800 text-base text-white flex items-center rounded-sm px-6 py-3 duration-200 transition-color"
        onClick={handleSignIn}
      >
        <svg className="text-white h-6 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
          <path fill="currentcolor" d="M17.999 2.113c-8.995 0-16.288 7.293-16.288 16.29 0 7.197 4.667 13.302 11.14 15.457.815.149 1.112-.354 1.112-.786l-.022-2.77c-4.531.984-5.487-2.184-5.487-2.184-.741-1.882-1.809-2.383-1.809-2.383-1.479-1.01.112-.99.112-.99 1.635.115 2.495 1.679 2.495 1.679 1.453 2.489 3.813 1.77 4.741 1.353.148-1.052.568-1.77 1.034-2.177-3.617-.411-7.42-1.809-7.42-8.051 0-1.778.635-3.232 1.677-4.371-.168-.412-.727-2.068.159-4.311 0 0 1.368-.438 4.48 1.67a15.56 15.56 0 0 1 4.078-.548c1.383.006 2.777.186 4.078.548 3.11-2.108 4.475-1.67 4.475-1.67.889 2.243.33 3.899.162 4.311 1.044 1.139 1.675 2.593 1.675 4.371 0 6.258-3.809 7.635-7.438 8.038.585.503 1.106 1.497 1.106 3.017l-.02 4.468c0 .436.293.943 1.12.784 6.468-2.159 11.131-8.26 11.131-15.455 0-8.997-7.294-16.29-16.291-16.29"/>
        </svg>
        Login with GitHub
      </button>
   </div>
  );
};

export default Login;
