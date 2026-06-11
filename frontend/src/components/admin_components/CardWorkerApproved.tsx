import approved from "../../assets/image/approved.png";
import trend_up from "../../assets/image/trend-up.svg";
import trend_down from "../../assets/image/trend-down.svg";
import { useEffect } from "react";

type Props = {
  procentApproved: number;
  approvedWorkers: number;
  calculateProcentApproved: () => void;
  countWorkersApproved: () => void;
};

export default function CardUsersApproved({
  procentApproved,
  approvedWorkers,
  calculateProcentApproved,
  countWorkersApproved,
}: Props) {
  useEffect(() => {
    countWorkersApproved();

    const interval = setInterval(() => {
      countWorkersApproved();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculateProcentApproved();
  }, [approvedWorkers]);
  
  return (
    <div className="rounded-md h-full">
      <div className="ml-2">
        <div className="flex justify-between">
          <div className="flex flex-col py-2 gap-y-1">
            <div>
              <span className="font-nunito font-semibold text-xs">
                Total Approved
              </span>
            </div>
            <div>
              <span className="font-bold">{approvedWorkers}</span>
            </div>
          </div>
          <div className="mr-2 mt-2">
            <img src={approved} alt="" className="h-7" />
          </div>
        </div>
        <div>
          {procentApproved >= 0 ? (
            <>
              <div className="flex font-bold font-nunito text-xs ">
                <span>
                  <img src={trend_up} alt="" className="h-4" />
                </span>
                <span className="text-[#00B894]">+{procentApproved}%</span>
                <span className="ml-1 font-nunito font-semibold text-xs">
                  Up from yesterday
                </span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-red-700">{procentApproved}%</span>
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
