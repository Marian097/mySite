import Logo from "../assets/logo/LogoHeader.png";

import { Link } from "react-router";

export default function Header() {

  return (
    <header className="flex items-center justify-end sticky z-20 min-w-screen bg-black/55 text-white border-2 border-amber-50">
      <div>
        <img src={Logo} className="w-44" />
      </div>
      <div>
        <Link to="/sign-up">
          <span className="cursor-pointer hover:bg-indigo-500 px-7 py-3 rounded-md">
            Sign-in
          </span>
        </Link>
      </div>
      <div>
        <Link to="/login">
          <span className="cursor-pointer  hover:bg-indigo-500 px-7 py-3 rounded-md">
            Login
          </span>
        </Link>
      </div>
    </header>
  );
}
