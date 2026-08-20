import Logo from "../assets/logo/LogoHeader.png";

type Props = {
  setIsLoggedForm: (type: boolean) => void;
}
export default function Header({setIsLoggedForm} : Props) {
  return (
<header className="sticky top-0 z-20 w-full bg-black/55 text-white border-b border-amber-50">
  <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

    <div>
      <img
        src={Logo}
        alt="Logo"
        className="w-28 sm:w-36 lg:w-44"
      />
    </div>


    <div className="flex items-center gap-2 sm:gap-4">
      <button
        onClick={() => setIsLoggedForm(false)}
        className="cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-indigo-500 sm:px-5 sm:py-3 sm:text-base"
      >
        Creează un cont
      </button>

      <button
        onClick={() => setIsLoggedForm(true)}
        className="cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-indigo-500 sm:px-5 sm:py-3 sm:text-base"
      >
        Intră în cont
      </button>
    </div>

  </div>
</header>
  );
}
