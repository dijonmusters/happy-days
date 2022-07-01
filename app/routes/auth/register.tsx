import { json } from "@remix-run/cloudflare";
import supabase from "~/utils/supabase";

export const loader = async () => {
  return json({ working: true });
};

const Register = () => {
  const handleRegister = async () => {
    const resp = await supabase.auth.signUp({
      email: "jon@supabase.com",
      password: "supa-secur3-password",
    });

    console.log({ resp });
  };

  return <button onClick={handleRegister}>Register</button>;
};

export default Register;
