import Notification from "../../assets/image/icons8-notification-64.png";
import type { Admin } from "../../types/AuthTypes/Admin";

type Props = {
  admin: Admin[];
};

export default function TopBar({ admin }: Props) {
  return (
    <>
        {admin.map((a) => (
          <div key = {a.id }className="flex  h-10 md:h-14 lg:h-16 justify-end bg-white">
            <div className="flex items-center">
              <img className="h-3" src={Notification} alt="" />
            </div>
            <div className="flex gap-x-2 px-3">
              <div className="flex items-center">
                <img className="h-6" src={`http://localhost:4000${a.profile_image}`} alt="" />
              </div>

              <div className="text-xs flex flex-col justify-center">
                <div>
                  <span>{a.username}</span>
                </div>
                <div>
                  <span>{a.role}</span>
                </div>
              </div>
            </div>
          </div >
        ))}
    </>
  );
}
