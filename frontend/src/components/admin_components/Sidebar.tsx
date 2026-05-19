
import DashStack from "../../assets/image/DashStack.png";

export default function Sidebar() {
  return (
    <div className=" border-2 border-black min-h-screen w-1/6">
      <div className = "flex justify-center">
        <img className="h-15 w-auto" src={DashStack} alt="" />
      </div>

      <div className="flex flex-col py-5 gap-y-2 text-xs">
        <div>
          <span>Dashboard</span>
        </div>
        <div>
          <span>Documents</span>
        </div>
        <div>
          <span>User</span>
        </div>
      </div>
    </div>
  );
}
