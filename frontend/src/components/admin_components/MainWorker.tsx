import CardWorker from "./CardWorker";
import CardWorkerApproved from "./CardWorkerApproved";
import CardWorkerPending from "./CardWorkerPending";
import CardWorkerRejected from "./CardWorkerRejected";
import Table from "./Table";
import TopBar from "./TopBar";
import type {Worker} from "../../types/WorkersTypes/Worker"
import type {Error} from "../../types/WorkersTypes/Error"
import {useEffect} from "react";
import type {Admin} from "../../types/AuthTypes/Admin"
import type {FormEvent} from  "react";


type Props = {
   error:Error,
   workers:Worker[],
   admin: Admin[],
   email: string,
   setEmail: (e: string) => void,
   setIsStatus: (status: string) => void,
   getWorkersRejected: () => void,  
   getWorkersApprove: () => void,
   getWorkersPending: () => void,
   getWorkersByEmail: (e: FormEvent<HTMLFormElement>) => void,
   getWorkers: () => void;
}


export default function MainWorker({error, workers, admin, email, setEmail, getWorkers, getWorkersPending, getWorkersRejected, getWorkersByEmail, getWorkersApprove, setIsStatus}: Props) {

  useEffect(() => {
    getWorkers()
  }, [])

  return (
    <div>
      <TopBar admin = {admin} />
      <div className="ml-5 py-5 relative">
        <div className = "absolute left-1/5">
          <h1 className = "font-bold font-nunito text-xl">Worker</h1>
        </div>
      </div>
      <div className="min-w-full justify-items-center">
        <section className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-48 sm:w-md md:w-2xl 2xl:w-4xl gap-5 my-5 py-5">
          <div className="bg-white rounded-md">
            <CardWorker/>
          </div>
          <div className="bg-white rounded-md">
            <CardWorkerRejected />
          </div>
          <div className="bg-white rounded-md">
            <CardWorkerApproved />
          </div>
          <div className="bg-white rounded-md">
            <CardWorkerPending />
          </div>
        </section>
        <section className="text-sm px-10 rounded-xl w-full sm:w-3xl md:w-3xl 2xl:w-7xl my-10 py-5 bg-white">
          <div className="pb-5">
            <h2 className="font-nunito font-bold">Total Worker</h2>
          </div>
          <Table error = {error} workers = {workers} email = {email} setEmail = {setEmail} getWorkersPending = {getWorkersPending} getWorkers = {getWorkers} setIsStatus = {setIsStatus} getWorkersRejected = {getWorkersRejected} getWorkersApprove = {getWorkersApprove} getWorkersByEmail = {getWorkersByEmail}/>
        </section>
      </div>
    </div>
  );
}
