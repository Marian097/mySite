import type { Worker } from "../../types/WorkersTypes/Worker";


type Props = {
  workers: Worker[]; 
};

export default function TBody({ workers}: Props) {



  return (
    <div>
      {workers.map((worker) => (
        <div
          className="grid grid-cols-7  bg-white gap-8 text-center py-3 overflow-auto text-xs sm:text-sm"
          key={worker.id}
        >
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
              <img
                src={`http://localhost:4000${worker.ci}`}
                alt=""
                className="h-15"
              />
            </span>
          </div>
          <div>
            <span>{worker.ci_expiration}</span>
          </div>
          <div>
            {worker.status === "Success" ? (
              <>
                <span className = "text-green-600 font-nunito">{worker.status}</span>
              </>
            ) : worker.status === "Rejected" ? (
              <>
                <span className = "text-red-600 font-nunito">{worker.status}</span>
              </>
            ) : worker.status === "Pending" ? (
              <>
                <span className = "text-indigo-500 font-nunito">{worker.status}</span>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col font-nunito text-xs gap-y-1">
            <span>
              <button className="w-full justify-center rounded-md bg-red-600 text-xs font-semibold text-white hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
                Delete
              </button>
            </span>
            <span>
              <button className="w-full justify-center rounded-md bg-green-600 text-xs font-semibold text-white hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
                Approve
              </button>
            </span>
            <span>
              <button className="w-full justify-center rounded-md bg-indigo-500 text-xs font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                Reject
              </button>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
