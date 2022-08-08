import EntryForm from "~/components/entry-form";
import Navigation from "~/components/navigation";

export { action } from "~/components/entry-form";

const NewEntry = () => {
  return (
    <>
    <Navigation/>
      <div className="w-full flex items-center justify-center">
        <EntryForm />
      </div>
    </>
    );
};

export default NewEntry;
