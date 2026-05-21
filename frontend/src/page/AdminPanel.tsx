
import Sidebar from "../components/admin_components/Sidebar";
import DashboardUsers from "../components/admin_components/MainUsers";


export default function AdminPanel() {
  return (
    <div className = "grid grid-cols-12">
      <aside className = "col-span-2">
          <Sidebar />
      </aside>
      <main className = "col-span-10 bg-[#f5f6fa]">
         <DashboardUsers/>
      </main>
    </div>
  );
}
