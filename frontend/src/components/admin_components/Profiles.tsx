import CardWorker from "./CardWorker";
import CardWorkerApproved from "./CardWorkerApproved";
import CardWorkerPending from "./CardWorkerPending";
import CardWorkerRejected from "./CardWorkerRejected";
import Table from "./Table";
import TopBar from "./TopBar";
import type { Worker } from "../../types/WorkersTypes/Worker";
import type { Error } from "../../types/WorkersTypes/Error";
import { useEffect } from "react";
import type { Admin } from "../../types/AuthTypes/Admin";
import type { FormEvent } from "react";
import type { Statistic } from "../../types/StatisticTypes/Statistic";
import UsersCharts from "./UsersCharts";

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
  errCharts: string;
  handleAcceptUser: (id: string) => void;
  handleRejectUser: (id: string) => void;
  getStats: () => void;
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
  getWorkersRejected: () => void;
  getWorkersApprove: () => void;
  getWorkersPending: () => void;
  getWorkersByEmail: (e: FormEvent<HTMLFormElement>) => void;
  getWorkerByCI_expiring: () => void;
  getWorkers: () => void;
};

export default function MainWorker({
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
  calculateProcent,
  countWorkers,
  setEmail,
  getWorkers,
  getWorkersPending,
  getWorkersRejected,
  getWorkersByEmail,
  getWorkersApprove,
  getWorkerByCI_expiring,
  setIsStatus,
}: Props) {
  useEffect(() => {
    getWorkers();
  }, []);

  return (
    <div>
      <TopBar admin={admin} />
      <div className="ml-5 py-5 relative">
        <div className="absolute left-1/5">
          <h1 className="font-bold font-nunito text-xl">Profiles</h1>
        </div>
      </div>
      <div className="min-w-full justify-items-center">
        <section className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-48 sm:w-md md:w-2xl 2xl:w-4xl gap-5 my-5 py-5">
          <div className="bg-white rounded-md">
            <CardWorker
              procent={procent}
              totalWorkers={totalWorkers}
              calculateProcent={calculateProcent}
              countWorkers={countWorkers}
            />
          </div>
          <div className="bg-white rounded-md">
            <CardWorkerRejected
              rejectedWorkers={rejectedWorkers}
              procentRejected={procentRejected}
              countWorkersRejected={countWorkersRejected}
              calculateProcentRejected={calculateProcentRejected}
            />
          </div>
          <div className="bg-white rounded-md">
            <CardWorkerApproved
              procentApproved={procentApproved}
              approvedWorkers={approvedWorkers}
              calculateProcentApproved={calculateProcentApproved}
              countWorkersApproved={countWorkersApproved}
            />
          </div>
          <div className="bg-white rounded-md">
            <CardWorkerPending
              pendingdWorkers={pendingdWorkers}
              procentPending={procentPending}
              countWorkersPending={countWorkersPending}
              calculateProcentPending={calculateProcentPending}
            />
          </div>
        </section>
        <section className="text-sm px-10 rounded-xl w-full sm:w-3xl md:w-3xl 2xl:w-7xl my-10 py-5 bg-white">
          <div className="pb-5">
            <h2 className="font-nunito font-bold">Total Worker</h2>
          </div>
          <Table
            error={error}
            workers={workers}
            email={email}
            setEmail={setEmail}
            getWorkersPending={getWorkersPending}
            getWorkers={getWorkers}
            setIsStatus={setIsStatus}
            getWorkersRejected={getWorkersRejected}
            getWorkersApprove={getWorkersApprove}
            getWorkersByEmail={getWorkersByEmail}
            getWorkerByCI_expiring={getWorkerByCI_expiring}
            handleAcceptUser = {handleAcceptUser}
            handleRejectUser = {handleRejectUser}
          />
        </section>
        <section className="min-w-3/4 h-100 bg-white rounded-md px-4 py-4">
          <UsersCharts data={data} errCharts={errCharts} getStats={getStats} />
        </section>
      </div>
    </div>
  );
}
