import pending from "../../assets/image/pending.png";
import trend_up from "../../assets/image/trend-up.svg";
import trend_down from "../../assets/image/trend-down.svg";
import { useEffect } from "react";

type Props = {
  pendingdWorkers: number;
  procentPending: number;
  countWorkersPending: () => void;
  calculateProcentPending: () => void;
};
export default function CardUsersPending({
  pendingdWorkers,
  procentPending,
  countWorkersPending,
  calculateProcentPending,
}: Props) {
  useEffect(() => {
    countWorkersPending()
    const interval = setInterval(() => {
      countWorkersPending();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculateProcentPending();
  }, [pendingdWorkers]);

  return (
    <div className=" rounded-md h-full">
      <div className="ml-2">
        <div className="flex justify-between">
          <div className="flex flex-col py-2 gap-y-1">
            <div>
              <span className="font-nunito font-semibold text-xs">
                Pending
              </span>
            </div>
            <div>
              <span className="font-nunito font-bold">{pendingdWorkers}</span>
            </div>
          </div>
          <div className="mr-2 mt-2">
            <img src={pending} alt="" className="h-7" />
          </div>
        </div>
        <div>
          {procentPending >= 0 ? (
            <>
              <div className="flex font-bold font-nunito text-xs ">
                <span>
                  <img src={trend_up} alt="" className="h-4" />
                </span>
                <span className="text-[#00B894]">+{procentPending}%</span>
                <span className="ml-1 font-nunito font-semibold text-xs">
                  Up from yesterday
                </span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-red-700">{procentPending}%</span>
                <span>
                  <img src={trend_down} alt="" />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
