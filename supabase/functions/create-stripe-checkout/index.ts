import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
// import Stripe from "https://esm.sh/stripe?target=deno";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.5";

// const stripe = Stripe(Deno.env.get("STRIPE_KEY")!, {
//   httpClient: Stripe.createFetchHttpClient(),
// });

// const supabase = createClient(
//   Deno.env.get("SUPABASE_URL")!,
//   Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
// );

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "apikey, X-Client-Info, Authorization",
      },
    });
  }

  const { planId } = await req.json();

  // TODO! Work out who the user is
  // TODO! select their `stripe_customer_id` from supabase
  // TODO! create Stripe checkout session based on that user
  // TODO! return session id

  return new Response(JSON.stringify({ planId }), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "apikey, X-Client-Info, Authorization",
    },
  });
});
