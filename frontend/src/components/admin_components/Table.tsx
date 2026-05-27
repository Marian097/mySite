import Theader from "../admin_components/Thead";
import Tbody from "../admin_components/Tbody";

import type { Worker } from "../../types/WorkersTypes/Worker";
import type { Error } from "../../types/WorkersTypes/Error";
import SearchBar from "../admin_components/SeachBar";
import NavSort from "./NavSort";

type Props = {
  error: Error;
  workers: Worker[];
};

export default function Table({ error, workers }: Props) {
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
          <NavSort/>
        </div>

          <Theader />
          <Tbody workers={workers} />
        </>
      )}
    </div>
  );
}
