import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { Statistic } from "../../types/StatisticTypes/Statistic";
import { useEffect } from "react";

type Props = {
  data: Statistic[];
  errCharts: string;
  getStats: () => void;
};
export default function UsersCharts({ data, errCharts, getStats }: Props) {
  useEffect(() => {
    getStats();

    const interval = setInterval(() => {
      getStats();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%", height: 300 }}>
      {!data ? (
        <>
          <span>{errCharts}</span>
        </>
      ) : (
        <>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey= "date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="profiles" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
