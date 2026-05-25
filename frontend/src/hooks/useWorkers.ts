import { useState } from "react";
import type { Worker } from "../types/WorkersTypes/Worker"
import type {Error} from "../types/WorkersTypes/Error"

export default function useWorkers(){
    const [error, setError] = useState<Error>({
        error: ""
    });
    const [workers, setWorkers] = useState<Worker[]>([])


    async function getWorkers()
    {
        try{

            const token = localStorage.getItem("token")

            if (!token) throw new Error ("Nu exista token")
            
            const response = await fetch("http://localhost:4000/api/users/worker", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Probleme la incarcarea datelor");

            const data: Worker[] = await response.json()
            console.log(data)
            setWorkers(data)

        }
        catch(err){
            if (err instanceof Error)
            {
                setError({ error: err.message })
            }
        }
    }



    return {
        error,
        workers,
        getWorkers,
    }
}