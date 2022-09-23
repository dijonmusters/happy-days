import { Link, useLoaderData } from "@remix-run/react";
import Navigation from "~/components/navigation";
import Stripe from "stripe";
import { loadStripe } from "@stripe/stripe-js";
import supabase from "~/utils/supabase";

export const loader = async () => {
  const stripe = new Stripe(STRIPE_SECRET, {
    httpClient: Stripe.createFetchHttpClient(),
    apiVersion: "2022-08-01",
  });

  const { data: prices } = await stripe.prices.list();

  const unsortedPlans = await Promise.all(
    prices.map(async (price) => {
      const product = await stripe.products.retrieve(String(price.product));

      if (price?.unit_amount === undefined || price?.unit_amount === null) {
        throw new Error(`Price ${price.id} has no unit amount`);
      }

      return {
        id: price.id,
        name: product.name,
        price: price?.unit_amount / 100,
        currency: price.currency,
      };
    })
  );

  const plans = unsortedPlans.sort((a, b) => a.price - b.price);

  return { plans };
};

const Index = () => {
  const { plans } = useLoaderData<Awaited<ReturnType<typeof loader>>>();

  const handleSubscription = (planId: string) => async () => {
    const { data, error } = await supabase.functions.invoke(
      "create-stripe-checkout",
      {
        body: JSON.stringify({
          planId,
        }),
      }
    );

    if (error) {
      console.error(error);
      return;
    }

    const stripe = await loadStripe(window.env.STRIPE_PUBLIC_KEY);
    await stripe?.redirectToCheckout({ sessionId: data?.id });
  };

  return (
    <>
      <Navigation />
      <div className="text-slate-900 font-extrabold text-2xl sm:text-4xl lg:text-4xl text-center">
        <p>
          Sunday Monday<span className="text-pink-400"> Happy </span>
          <span className="text-blue-400">Days</span>
        </p>
        <p>
          Tuesday Wednesday<span className="text-pink-400"> Happy </span>
          <span className="text-blue-400">Days</span>
        </p>
      </div>

      <div className="my-4 flex justify-center">
        <Link
          to="entries"
          className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 text-white h-12 px-6 rounded flex items-center justify-center"
        >
          Get started
        </Link>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center p-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`${
              plan.name === "Standard" ? "bg-pink-300" : "bg-blue-300"
            } rounded-xl text-slate-800`}>
            <div className="p-8 mx-3 mt-3 rounded-t-xl bg-white">
              <div className="text-center uppercase">{plan.name}</div>
              <h2 className="mt-10 font-serif text-5xl text-center">
                ${plan.price}
              </h2>
              <h3 className="mt-2 text-center">Per month</h3>
              <div className="flex justify-center">
                <button
                  onClick={handleSubscription(plan.id)}
                  className={`border-blue-400 hover:bg-blue-400 inline-block px-10 py-3 my-6 text-center border rounded-lg duration-200 hover:text-white cursor-pointer
                  ${
                    plan.name === "Standard" &&
                    "bg-pink-300 border-pink-400 hover:bg-pink-400 hover:border-pink-400"
                  }`}
                >
                  Purchase
                </button>
              </div>
            </div>
            <div className="border-t border-blue-300"></div>
            <div className="p-8 mx-3 mb-3 rounded-b-xl bg-white">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                  <span className="ml-1">
                    {plan.name === "Free"
                      ? 10
                      : plan.name === "Standard"
                      ? "50"
                      : "Unlimited"}{" "}
                    Entries
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Index;
