import { Link } from "@remix-run/react";
import Navigation from "~/components/navigation";

export default function Index() {
  return (
    <>
      <Navigation/>
      <div className="text-slate-900 font-extrabold text-2xl sm:text-4xl lg:text-4xl text-center">
        <p>Sunday Monday<span className="text-pink-400"> Happy </span><span className="text-blue-400">Days</span></p>
        <p>Tuesday Wednesday<span className="text-pink-400"> Happy </span><span className="text-blue-400">Days</span></p>
      </div>

      <div className="my-4 flex justify-center">
        <Link to="entries" className="bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-50 text-white h-12 px-6 rounded flex items-center justify-center">
          Get started
        </Link>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center p-2">
        <div className="bg-blue-300 rounded-xl text-slate-800">
          <div className="p-8 mx-3 mt-3 rounded-t-xl bg-white">
            <div className="text-center uppercase">Basic</div>
            <h2 className="mt-10 font-serif text-5xl text-center">$0.00</h2>
            <h3 className="mt-2 text-center">Per month</h3>
            <div className="flex justify-center">
              <div className="inline-block px-10 py-3 my-6 text-center border border-blue-400 rounded-lg duration-200 hover:bg-blue-400 hover:border-blue-400 hover:text-white cursor-pointer">Purchase</div>
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
                  strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="ml-1">10 Entries</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-pink-400 rounded-xl text-slate-800">
          <div className="p-8 mx-3 mt-3 rounded-t-xl bg-white">
            <div className="text-center uppercase">Standard</div>
            <h2 className="mt-10 font-serif text-5xl text-center">$4.99</h2>
            <h3 className="mt-2 text-center">Per month</h3>
            <div className="flex justify-center">
              <div className="inline-block px-10 py-3 my-6 text-center border border-pink-400 rounded-lg duration-200 bg-pink-400 hover:bg-pink-500 text-white cursor-pointer">Purchase</div>
            </div>
          </div>
          <div className="border-t border-pink-400"></div>
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
                  strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="ml-1">50 Entries</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-300 rounded-xl text-slate-800">
          <div className="p-8 mx-3 mt-3 rounded-t-xl bg-white">
            <div className="text-center uppercase">Premium</div>
            <h2 className="mt-10 font-serif text-5xl text-center">$9.99</h2>
            <h3 className="mt-2 text-center">Per month</h3>
            <div className="flex justify-center">
            <div className="inline-block px-10 py-3 my-6 text-center border border-blue-400 rounded-lg duration-200 hover:bg-blue-400 hover:border-blue-400 hover:text-white cursor-pointer">Purchase</div>
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
                  strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
                <span className="ml-1">Unlimited Entries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
}
