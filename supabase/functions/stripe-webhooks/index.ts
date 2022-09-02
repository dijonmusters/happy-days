import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@9.6.0?target=deno&no-check";

const stripe = Stripe(Deno.env.get("STRIPE_KEY"), {
  httpClient: Stripe.createFetchHttpClient(),
});

// This is needed in order to use the Web Crypto API in Deno.
const cryptoProvider = Stripe.createSubtleCryptoProvider();

console.log(`Function "stripe-webhooks" up and running!`);

serve(async (request) => {
  const signature = request.headers.get("Stripe-Signature");

  // First step is to verify the event. The .text() method must be used as the
  // verification relies on the raw request body rather than the parsed JSON.
  const body = await request.text();
  let receivedEvent;
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get("STRIPE_SIGNING_SECRET"),
      undefined,
      cryptoProvider
    );
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }
  console.log(`🔔 Event received: ${receivedEvent.id}`);

  // Secondly, we use this event to query the Stripe API in order to avoid
  // handling any forged event. If available, we use the idempotency key.
  const requestOptions =
    receivedEvent.request && receivedEvent.request.idempotency_key
      ? {
          idempotencyKey: receivedEvent.request.idempotency_key,
        }
      : {};

  let retrievedEvent;
  try {
    retrievedEvent = await stripe.events.retrieve(
      receivedEvent.id,
      requestOptions
    );
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }

  console.log({ type: retrievedEvent.type });

  // switch (retrievedEvent.type) {
  //   case "customer.subscription.created":
  //     const subscription = retrievedEvent.data.object;
  //     // Then define and call a function to handle the retrievedEvent customer.subscription.created
  //     break;
  //   case "customer.subscription.deleted":
  //     const subscription = retrievedEvent.data.object;
  //     // Then define and call a function to handle the retrievedEvent customer.subscription.deleted
  //     break;
  //   case "customer.subscription.updated":
  //     const subscription = retrievedEvent.data.object;
  //     // Then define and call a function to handle the retrievedEvent customer.subscription.updated
  //     break;
  //   // ... handle other retrievedEvent types
  //   default:
  //     console.log(`Unhandled retrievedEvent type ${retrievedEvent.type}`);
  // }

  return new Response(JSON.stringify({ id: retrievedEvent.id, status: "ok" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
