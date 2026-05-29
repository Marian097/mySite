import Theader from "../admin_components/Thead";
import Tbody from "../admin_components/Tbody";

import type { Worker } from "../../types/WorkersTypes/Worker";
import type { Error } from "../../types/WorkersTypes/Error";
import SearchBar from "../admin_components/SeachBar";
import NavSort from "./NavSort";


type Props = {
  error: Error;
  workers: Worker[];
  // isStatus: string 
  setIsStatus: (status: string) => void,
  getWorkersPending: () => void;
  getWorkers: () => void;
};

export default function Table({ error, workers, getWorkersPending, getWorkers, setIsStatus }: Props) {


  return (
    <div>
      {error.error ? (
        <>
          <p>{error.error}</p>
        </>
      ) : (
        <>
        <div className = "flex">
          <SearchBar />
          <NavSort getWorkers = {getWorkers} getWorkersPending = {getWorkersPending} setIsStatus = {setIsStatus}/>
        </div>

          <Theader />
          <Tbody workers={workers} />
        </>
      )}
    </div>
  );
}
