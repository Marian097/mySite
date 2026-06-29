
import DashStack from "../../assets/image/DashStack.png";

export default function Sidebar() {
  return (
    <div className="h-screen bg-white">
      <div className = "flex justify-center">
        <img className="h-20 w-auto" src={DashStack} alt="" />
      </div>

      <div className="flex flex-col py-5 gap-y-4 text-xs font-bold font-nunito items-center">
        <div className = " hover:bg-indigo-300 py-1 px-1">
          <span>Dashboard</span>
        </div>
        <div className = " hover:bg-indigo-300 py-1 px-1">
          <span>Documents</span>
        </div>
        <div className = " hover:bg-indigo-300 py-1 px-1">
          <span>Profiles</span>
        </div>
        <div className = " hover:bg-indigo-300 py-1 px-1">
          <span>Payments</span>
        </div>
         <div className = " hover:bg-indigo-300 py-1 px-1">
          <span>Messages</span>
        </div>
      </div>
    </div>
  );
}
