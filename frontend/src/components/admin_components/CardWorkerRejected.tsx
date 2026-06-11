import rejected from "../../assets/image/employee.png";
import trend_up from "../../assets/image/trend-up.svg";
import trend_down from "../../assets/image/trend-down.svg";
import { useEffect } from "react";

type Props = {
  rejectedWorkers: number;
  procentRejected: number;
  countWorkersRejected: () => void;
  calculateProcentRejected: () => void;
};

export default function CardUsersRejected({
  rejectedWorkers,
  procentRejected,
  countWorkersRejected,
  calculateProcentRejected,
}: Props) {
  useEffect(() => {
    countWorkersRejected();

    const interval = setInterval(() => {
      countWorkersRejected();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculateProcentRejected();
  }, [rejectedWorkers]);
  
  
  return (
    <div className="rounded-md h-full">
      <div className="ml-2">
        <div className="flex justify-between">
          <div className="flex flex-col py-2 gap-y-1">
            <div>
              <span className="font-nunito font-semibold text-xs">
                Total Rejected
              </span>
            </div>
            <div>
              <span className="font-nunito font-bold">{rejectedWorkers}</span>
            </div>
          </div>
          <div className="mr-2 mt-2">
            <img src={rejected} alt="" className="h-7" />
          </div>
        </div>
        <div>
          {procentRejected >= 0 ? (
            <>
              <div className="flex font-bold font-nunito text-xs ">
                <span>
                  <img src={trend_up} alt="" className="h-4" />
                </span>
                <span className="text-[#00B894]">+{procentRejected}%</span>
                <span className="ml-1 font-nunito font-semibold text-xs">
                  Up from yesterday
                </span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-red-700">{procentRejected}%</span>
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
