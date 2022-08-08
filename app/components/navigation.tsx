import supabase from "~/utils/supabase";
import { NavLink } from "@remix-run/react";

  const Navigation = () => {
    return (
    <nav className="flex justify-between px-2 md:px-8 py-4 mb-10 bg-white shadow-md">
        <div className="navbar-brand">
            <div className="text-3xl font-bold text-blue-400">
                <span className="text-pink-400">Happy</span> Days
            </div>
        </div>
        <div className="flex">
            <ul className="flex gap-6 items-center">
                <li>
                    <NavLink to="/" className={({ isActive }) => `${isActive ? "border-b-4 border-blue-400 py-1" : ""}`}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/entries" className={({ isActive }) => `${isActive ? "border-b-4 border-blue-400 py-1" : ""}`}>
                        Entries
                    </NavLink>
                </li>
                <li>
                    <div className="flex gap-2 px-4 md:px-6 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-sm cursor-pointer duration-200 transition-color" onClick={() => supabase.auth.signOut()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                        Logout
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    );
};

export default Navigation;
