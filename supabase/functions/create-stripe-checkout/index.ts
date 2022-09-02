import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import Stripe from "https://esm.sh/stripe?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@1.35.5";

const stripe = Stripe(Deno.env.get("STRIPE_KEY")!, {
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

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

  const token = req.headers.get("Authorization")!.replace("Bearer ", "");
  const { user } = await supabase.auth.api.getUser(token);

  if (!user) {
    throw new Error("User not found");
  }

  const {
    data: { stripe_customer_id },
  } = await supabase
    .from("user_data")
    .select("stripe_customer_id")
    .match({ id: user.id })
    .single();

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer_id,
    payment_method_types: ["card"],
    mode: "subscription",
    subscription_data: {
      items: [
        {
          plan: planId,
        },
      ],
    },
    success_url: "http://localhost:8787/success",
    cancel_url: "http://localhost:8787/cancel",
  });

  return new Response(JSON.stringify({ id: session.id }), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "apikey, X-Client-Info, Authorization",
    },
  });
});
