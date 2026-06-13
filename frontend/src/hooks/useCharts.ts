import {useState} from "react";
import type {Statistic} from "../types/StatisticTypes/Statistic";

export default function useCharts() {
    const [data, setData] = useState<Statistic[]>([]);
    const [error, setError] = useState<string>("")
    
    async function getStats(){
        try{
            const token = localStorage.getItem("token");

            if (!token) throw new Error ("Token lipsa");

            const response = await fetch ("http://localhost:4000/api/users/worker/statistic", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response.ok) throw new Error ("Eroare la incarcarea datelor");

            const data = await response.json()
            setData(data)
        }
        catch(err){
            if (err instanceof Error) setError(err.message)
        }
    }

    return {
        data,
        error,
        getStats
    }
}
