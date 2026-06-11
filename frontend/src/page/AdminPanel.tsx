import Sidebar from "../components/admin_components/Sidebar";
import MainWorker from "../components/admin_components/MainWorker";
import type { Worker } from "../types/WorkersTypes/Worker";
import type { Error } from "../types/WorkersTypes/Error";
import type { Admin } from "../types/AuthTypes/Admin";
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
export default function AdminPanel({
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
        <MainWorker
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
          />
      </main>
    </div>
  );
}
