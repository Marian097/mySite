
import DashStack from "../../assets/image/DashStack.png";

export default function Sidebar() {
  return (
    <div className="h-screen bg-white">
      <div className = "flex justify-center">
        <img className="h-20 w-auto" src={DashStack} alt="" />
      </div>

      <div className="flex flex-col py-5 gap-y-2 md:text-sm text-xs 2xl:text-2xl items-center">
        <div>
          <span>Dashboard</span>
        </div>
        <div>
          <span>Documents</span>
        </div>
        <div>
          <span>Users</span>
        </div>
        <div>
          <span>Payments</span>
        </div>
         <div>
          <span>Messages</span>
        </div>
      </div>
    </div>
  );
}
