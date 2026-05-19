import Account from "../../assets/image/icons8-account-48.png";
import Notification from "../../assets/image/icons8-notification-64.png";

export default function TopBar() {
  return (
    <>
      <div className="flex border-2 border-black h-10 md:h-14 lg:h-16 w-screen justify-end">
        <div className="flex items-center">
          <img className="h-3" src={Notification} alt="" />
        </div>
        <div className="flex gap-x-2 px-3">
          <div className="flex items-center">
            <img className="h-6" src={Account} alt="" />
          </div>

          <div className="text-xs ">
            <div>
              <span>Name</span>
            </div>
            <div>
              <span>Rol</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
