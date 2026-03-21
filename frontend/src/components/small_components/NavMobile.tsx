import customer from "../../assets/image/customer.png";
import Dropdown from "../small_components/Dropdown";

type Props = {
  setIsDropdown: (option: boolean) => void;
  isDropdown: boolean;
};

export default function NavMobile({ isDropdown, setIsDropdown }: Props) {
  return (
    <div className = "flex items-center">
      <div>
        <img src={customer} alt="" onClick={() => setIsDropdown(true)} className = "w-10 mb-5 mr-5"/>
      </div>
      {isDropdown && <Dropdown />}
    </div>
  );
}
