import TotalCard from "@/app/ui/dashboard/(components)/totalCard";
import Table from "@/app/ui/dashboard/(components)/table";
import useCards from "@/app/hooks/useCards"
import { useEffect } from "react"


export default function Page() {
  const { error, procent, countWorkers, calculateProcent, getTotalWorkers } =
    useCards();

  useEffect(() => {
    getTotalWorkers();

    const interval = setInterval(() => {
      getTotalWorkers();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculateProcent();

    const interval = setInterval(() => {
      getTotalWorkers();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <TotalCard workers={countWorkers?.total} />
      <Table />
    </div>
  );
}
