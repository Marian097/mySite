import Sidebar from "../components/admin_components/Sidebar";
import Profiles from "../components/admin_components/Profiles";
import type { Worker } from "../types/WorkersTypes/Worker";
import type { Error } from "../types/WorkersTypes/Error";
import type { Admin } from "../types/AuthTypes/Admin";
import type { Statistic } from "../types/StatisticTypes/Statistic"
import type { FormEvent } from "react";

type Props = {
  error: Error;
  workers: Worker[];
  admin: Admin[];
  email: string;
  procent: number;
  totalWorkers: number;
  procentApproved: number;
  approvedWorkers: number;
  rejectedWorkers: number;
  procentRejected: number;
  pendingdWorkers: number;
  procentPending: number;
  data: Statistic[];
  errCharts:string;
  handleAcceptUser: (id: string) => void;
  handleRejectUser: (id: string) => void;
  getStats: () => void
  countWorkersPending: () => void;
  calculateProcentPending: () => void;
  countWorkersRejected: () => void;
  calculateProcentRejected: () => void;
  calculateProcentApproved: () => void;
  countWorkersApproved: () => void;
  countWorkers: () => void;
  calculateProcent: () => void;
  setEmail: (e: string) => void;
  setIsStatus: (status: string) => void;
  getWorkersPending: () => void;
  getWorkersRejected: () => void;
  getWorkersApprove: () => void;
  getWorkersByEmail: (e: FormEvent<HTMLFormElement>) => void;
  getWorkerByCI_expiring: () => void;
  getWorkers: () => void;
};
export default function admin_panel({
  error,
  workers,
  admin,
  email,
  procent,
  totalWorkers,
  procentApproved,
  approvedWorkers,
  rejectedWorkers,
  procentRejected,
  pendingdWorkers,
  procentPending,
  data,
  errCharts,
  handleAcceptUser,
  handleRejectUser,
  getStats,
  countWorkersPending,
  calculateProcentPending,
  countWorkersRejected,
  calculateProcentRejected,
  calculateProcentApproved,
  countWorkersApproved,
  countWorkers,
  calculateProcent,
  setEmail,
  getWorkersPending,
  getWorkersRejected,
  getWorkersApprove,
  getWorkersByEmail,
  getWorkers,
  getWorkerByCI_expiring,
  setIsStatus,
}: Props) {
  return (
    <div className="grid grid-cols-12">
      <aside className="col-span-1 bg-[#f5f6fa] h-screen">
        <Sidebar />
      </aside>
      <main className="col-span-11 bg-[#f5f6fa]">
        <Profiles
          error={error}
          email={email}
          workers={workers}
          countWorkers={countWorkers}
          procent={procent}
          totalWorkers={totalWorkers}
          calculateProcent={calculateProcent}
          getWorkers={getWorkers}
          getWorkersPending={getWorkersPending}
          setIsStatus={setIsStatus}
          admin={admin}
          getWorkersRejected={getWorkersRejected}
          getWorkersApprove={getWorkersApprove}
          getWorkersByEmail={getWorkersByEmail}
          setEmail={setEmail}
          getWorkerByCI_expiring={getWorkerByCI_expiring}
          procentApproved = {procentApproved}
          approvedWorkers = {approvedWorkers}
          calculateProcentApproved = {calculateProcentApproved}
          countWorkersApproved = {countWorkersApproved}
          rejectedWorkers = {rejectedWorkers}
          procentRejected = {procentRejected}
          countWorkersRejected = {countWorkersRejected}
          calculateProcentRejected = {calculateProcentRejected}
          pendingdWorkers = {pendingdWorkers}
          procentPending = {procentPending}
          countWorkersPending = {countWorkersPending}
          calculateProcentPending = {calculateProcentPending}
          data = {data}
          errCharts = {errCharts}
          getStats = {getStats}
          handleAcceptUser = {handleAcceptUser}
          handleRejectUser = {handleRejectUser}
          />
      </main>
    </div>
  );
}
