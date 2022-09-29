import { Link } from "@remix-run/react";
import Navigation from "~/components/navigation";

const Success = () => {
  return (
    <>
      <Navigation />
      <div className="w-full flex flex-col items-center justify-center p-2">
        <div className="bg-pink-400 rounded-xl w-full md:w-1/2">
          <div className="p-8 mx-3 mt-3 rounded-t-xl bg-white text-center">
            <div className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-32 h-32 text-green-400">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-blue-400 text-1xl sm:text-3xl lg:text-4xl text-center font-extrabold">
              Your purchase was successful!
            </h2>
          </div>
          <div className="mx-3 mb-3 rounded-b-xl bg-white text-center">
            <Link
              to="/entries"
              className="border-blue-400 bg-blue-400 inline-block px-10 py-3 my-4 text-center border rounded-lg duration-200 text-white cursor-pointer"
            >
              Back to entries
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Success;
