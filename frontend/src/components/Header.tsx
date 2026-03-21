import Logo from "../assets/logo/LogoHeader.png"
import NavDesktop from "./small_components/NavDesktop";
import NavMobile from "./small_components/NavMobile";



type Props = {
  setIsSingUp: (option:boolean) => void;
  setIsDropdown: (option: boolean) => void;
  isDropdown: boolean;
}

export default function Header({setIsSingUp, setIsDropdown, isDropdown}: Props) {
  return (
    <header className="flex justify-between sticky z-20 min-w-screen bg-black/55 text-white border-2 border-amber-50">
      <div>
        <img src={Logo} className= "w-44" />
      </div>
      <div className = "hidden md:flex">
        <NavDesktop setIsSingUp = {setIsSingUp}/>
      </div>
      <div className = "md:hidden flex">
        <NavMobile setIsDropdown = {setIsDropdown} isDropdown = {isDropdown}/>
      </div>
    </header>
  );
}
