
import Sidebar from "../components/admin_components/Sidebar";
import DashboardWorker from "../components/admin_components/MainWorker";


export default function AdminPanel() {
  return (
    <div className = "grid grid-cols-12">
      <aside className = "col-span-2">
          <Sidebar />
      </aside>
      <main className = "col-span-10 bg-[#f5f6fa]">
         <DashboardWorker/>
      </main>
    </div>
  );
}
