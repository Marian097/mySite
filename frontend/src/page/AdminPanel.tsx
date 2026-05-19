import Sidebar from "../components/admin_components/Sidebar";
import TopBar from "../components/admin_components/TopBar";


export default function AdminPanel() {
  return (
    <div>
      <div className = "flex">
        <Sidebar/>
        <TopBar/>
      </div>
    </div>
  );
}
