
import Sidebar from "../components/admin_components/Sidebar";
import MainWorker from "../components/admin_components/MainWorker";
import type {Worker} from "../types/WorkersTypes/Worker"
import type {Error} from "../types/WorkersTypes/Error"
import type {Admin} from "../types/AuthTypes/Admin"

type Props = {
   error:Error,
   workers:Worker[],
   admin: Admin[],
   email: string,
   setEmail: (e: string) => void,
   setIsStatus: (status: string) => void,
   getWorkersPending: () => void,
   getWorkersRejected: () => void,
   getWorkersApprove: () => void,
   getWorkersByEmail: () => void,
   getWorkers: () => void;  
}
export default function AdminPanel({error, workers, admin, email, setEmail, getWorkersPending, getWorkersRejected, getWorkersApprove, getWorkersByEmail, getWorkers, setIsStatus}: Props) {
  return (
    <div className = "grid grid-cols-12">
      <aside className = "col-span-1 bg-[#f5f6fa] h-screen">
          <Sidebar />
      </aside>
      <main className = "col-span-11 bg-[#f5f6fa]">
         <MainWorker error = {error} email = {email} workers = {workers} getWorkers = {getWorkers} getWorkersPending= {getWorkersPending} setIsStatus = {setIsStatus} admin = {admin}  getWorkersRejected = {getWorkersRejected} getWorkersApprove = {getWorkersApprove} getWorkersByEmail = {getWorkersByEmail} setEmail = {setEmail} />
      </main>
    </div>
  );
}
