import type { Worker } from "../../types/WorkersTypes/Worker";

type Props = {
  workers: Worker[];
};

export default function TBody({ workers }: Props) {
  return (
    <div>
      {workers.map((worker) => (
        <div className="grid grid-cols-6  bg-white gap-8 text-center py-3 overflow-auto text-xs sm:text-sm" key = {worker.id}>
          <div>
            <span>{worker.id}</span>
          </div>
          <div>
            <span>{worker.username}</span>
          </div>
          <div className="overflow-auto">
            <span>{worker.email}</span>
          </div>
          <div>
            <span>
              <img src={`http://localhost:4000${worker.ci}`} alt="" className="h-15" />
            </span>
          </div>
          <div>
            <span>{worker.ci_expiration}</span>
          </div>
          <div>
            <span>{worker.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
