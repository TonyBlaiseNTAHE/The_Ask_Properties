import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/IMG_6890.PNG";
import { FaSearch } from "react-icons/fa";

const Logo = () => (
  <img src={logo} alt="Logo" className="h-8 sm:h-10 self-center" />
);
export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <Logo />
        </Link>
        <form className="bg-slate-100 p-3 rouded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <li className=" sm:inline text-slate-700 hover:underline">Home</li>
          <li className="sm:inline text-slate-700 hover:underline">About</li>
          <li className="sm:inline text-slate-700 hover:underline">Sign In</li>
        </ul>
      </div>
    </header>
  );
}
