import { useState } from "react";
import type { Worker } from "../types/WorkersTypes/Worker";
import type { Error } from "../types/WorkersTypes/Error";

export default function useWorkers() {
  const [error, setError] = useState<Error>({
    error: "",
  });
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isStatus, setIsStatus] = useState<string>("all");

  async function getWorkers() {
    try {
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Nu exista token");

      const response = await fetch("http://localhost:4000/api/users/worker", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Nici un rezultat");

      const data: Worker[] = await response.json();
      setWorkers(data);
    } catch (err) {
      if (err instanceof Error) {
        setError({ error: err.message });
      }
    }
  }

  async function getWorkersPending() {
    try {
        
      setWorkers([]);
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Token lipsa");

      const response = await fetch(
        "http://localhost:4000/api/users/worker/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) throw new Error("Nici un rezultat");

      const data = await response.json();
      setWorkers(data);
    } catch (err) {
      if (err instanceof Error) {
        setError({ error: err.message });
      }
    }
  }

  async function getWorkerRejected()
  {
    try{
      setWorkers([])
      const token = localStorage.getItem("token")

      if (!token) throw new Error ("Token lipsa")
      
        const response = await fetch ("http://localhost:4000/api/users/worker/rejected", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) throw new Error("Nici un rezultat");

        const data = await response.json()

        setWorkers(data)
    }

    catch(err){
      if (err instanceof Error) setError({error: err.message})
    }
  }


  async function getWorkerApproved(){
    try{
      setWorkers([])
      const token = localStorage.getItem("token");

      if (!token) throw new Error ("Token lipsa");

      const response = await fetch("http://localhost:4000/api/users/worker/approved", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) throw new Error ("Nici un rezultat");
      const data = await response.json()

      setWorkers(data)
    }
    catch(err){
      if (err instanceof Error) setError({error: err.message})
    }
  }

  return {
    error,
    workers,
    isStatus,
    setIsStatus,
    getWorkersPending,
    getWorkers,
  };
}
