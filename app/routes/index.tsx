import { Link } from "@remix-run/react";
import Navigation from "~/components/navigation";

export default function Index() {
  return (
    <>
      <Navigation/>
      <Link to="/entries">Go to entries 👉</Link>
    </>
    );
}
