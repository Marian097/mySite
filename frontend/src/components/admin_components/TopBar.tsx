import Account from "../../assets/image/icons8-account-48.png";
import Notification from "../../assets/image/icons8-notification-64.png";

export default function TopBar() {
  return (
    <>
      <div className="flex  h-10 md:h-14 lg:h-16 justify-end bg-white">
        <div className="flex items-center">
          <img className="h-3" src={Notification} alt="" />
        </div>
        <div className="flex gap-x-2 px-3">
          <div className="flex items-center">
            <img className="h-6" src={Account} alt="" />
          </div>

          <div className="text-xs flex flex-col justify-center">
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
