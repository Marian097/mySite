import users from "../../assets/image/Total_users.png";
import { useEffect } from "react";
import trend_up from "../../assets/image/trend-up.svg"
import trend_down from "../../assets/image/trend-down.svg"

type Props = {
  procent: number;
  totalWorkers: number;
  countWorkers: () => void;
  calculateProcent: () => void;
};

export default function CardUser({
  procent,
  totalWorkers,
  countWorkers,
  calculateProcent,
}: Props) {
  useEffect(() => {
    countWorkers();
  }, []);

  useEffect(() => {
    calculateProcent();
  }, [procent]);

  return (
    <div className=" rounded-md h-full">
      <div className="ml-2">
        <div className="flex justify-between">
          <div className="flex flex-col py-2 gap-y-1">
            <div>
              <span className="font-nunito font-semibold text-xs">
                Total Worker
              </span>
            </div>
            <div>
              <span className="font-nunito font-bold">{totalWorkers}</span>
            </div>
          </div>
          <div className="mr-2 mt-2">
            <img src={users} alt="" className="h-7" />
          </div>
        </div>
        <div>
          {procent >= 0 ? (
            <><div className = "flex font-bold font-nunito text-xs ">
              <span><img src={trend_up} alt="" className = "h-4" /></span>
              <span className="text-[#00B894]">{procent}%</span>
              <span className = "ml-1 font-nunito font-semibold text-xs">Up from yesterday</span>
    
            </div>
              
            </>
          ) : (
            <>
            <div>
              <span className="text-red-700">{procent}%</span>
              <span><img src={trend_down} alt="" /></span>
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
