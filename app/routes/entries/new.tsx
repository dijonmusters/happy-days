import EntryForm from "~/components/entry-form";

export { action } from "~/components/entry-form";

const NewEntry = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <EntryForm />
    </div>
    );
};

export default NewEntry;
