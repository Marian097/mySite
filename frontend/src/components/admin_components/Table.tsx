import Theader from "../admin_components/Thead";
import Tbody from "../admin_components/Tbody";

import type { Worker } from "../../types/WorkersTypes/Worker";
import type { Error } from "../../types/WorkersTypes/Error";
import SearchBar from "../admin_components/SeachBar";
import NavSort from "./NavSort";
import type {FormEvent} from  "react";


type Props = {
  error: Error;
  workers: Worker[];
  // isStatus: string 
  email: string,
  setEmail: (e: string) => void,
  setIsStatus: (status: string) => void,
  getWorkersRejected: () => void, 
  getWorkersApprove: () => void,
  getWorkersPending: () => void;
  getWorkerByCI_expiring: () => void;
  getWorkersByEmail: (e: FormEvent<HTMLFormElement>) => void;
  getWorkers: () => void;
};

export default function Table({ error, workers, email, setEmail, getWorkersPending, getWorkersRejected, getWorkersByEmail, getWorkersApprove,  getWorkers, getWorkerByCI_expiring, setIsStatus }: Props) {


  return (
    <div>
      {error.error ? (
        <>
          <p>{error.error}</p>
        </>
      ) : (
        <>
        <div className = "flex">
          <SearchBar email = {email} setEmail = {setEmail} getWorkersByEmail = {getWorkersByEmail}/>
          <NavSort getWorkers = {getWorkers} getWorkersPending = {getWorkersPending} setIsStatus = {setIsStatus} getWorkersRejected = {getWorkersRejected} getWorkersApprove = {getWorkersApprove} getWorkerByCI_expiring = {getWorkerByCI_expiring} />
        </div>
          <Theader />
          <Tbody workers={workers} />
        </>
      )}
    </div>
  );
}
