import { Link } from "@remix-run/react";
import EntryForm from "~/components/entry-form";
import Navigation from "~/components/navigation";

export { action } from "~/components/entry-form";

const NewEntry = () => {
  return (
    <>
    <Navigation/>
      <div className="w-full flex flex-col items-center justify-center p-2">
        <Link to="/entries">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 text-gray-500 cursor-pointer hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </Link>
        <EntryForm />
      </div>
    </>
    );
};

export default NewEntry;
