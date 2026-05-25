
import Sidebar from "../components/admin_components/Sidebar";
import MainWorker from "../components/admin_components/MainWorker";
import type {Worker} from "../types/WorkersTypes/Worker"
import type {Error} from "../types/WorkersTypes/Error"

type Props = {
   error:Error,
   workers:Worker[],
   getWorkers: () => void
}
export default function AdminPanel({error, workers, getWorkers}: Props) {
  return (
    <div className = "grid grid-cols-12">
      <aside className = "col-span-1 bg-[#f5f6fa] h-screen">
          <Sidebar />
      </aside>
      <main className = "col-span-11 bg-[#f5f6fa]">
         <MainWorker error = {error} workers = {workers} getWorkers = {getWorkers} />
      </main>
    </div>
  );
}
