import { useState, type FormEvent } from "react";
import type { Worker } from "../types/WorkersTypes/Worker";
import type { Error } from "../types/WorkersTypes/Error";

export default function useWorkers() {
  const [error, setError] = useState<Error>({
    error: "",
  });
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [isStatus, setIsStatus] = useState<string>("all");
  const [email, setEmail] = useState<string>("");
  const [totalWorkers, setTotalWorkers] = useState<number>();
  const [approvedWorkers, setApprovedWorkers] = useState<number>();
  const [procentApproved, setProcentApproved] = useState<number>();
  const [rejectedWorkers, setRejectedWorkers] = useState<number>();
  const [procentRejected, setProcentRejected] = useState<number>();
  const [pendingdWorkers, setPendingWorkers] = useState<number>();
  const [procentPending, setProcentPending] = useState<number>();
  const [procent, setProcent] = useState<number>();
  // const [isAccept, setIsAccept] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  



  // async function handleDeleteUser(id: string)
  // {
  //   try{
  //     const token = localStorage.getItem("token");

  //     if (!token) throw new Error ("Token lipsa");
  //     if (!id) throw new Error ("Nu puteti face aceste modificari");

  //     const response = await fetch ("http://localhost:4000/api/users/delete", {
  //       method: "DELETE",
  //       headers:{
  //         Authorization: `Bearer ${token}`
  //       },
  //       body: JSON.stringify({id})
  //     })

  //     if (!response.ok) throw new Error ("A intervenit o eroare");

  //     setMessage("Ati sters cu succes utilizatorul")
  //     getWorkers()

  //   }
  //   catch(err){
  //     if (err instanceof Error) setError({error: err.message})
  //   }
  // }


  async function handleRejectUser(id: string)
  {
    try{

      const token = localStorage.getItem("token");

      if (!token) throw new Error ("Token lipsa");
      if (!id) throw new Error ("Nu puteti face aceste modificari");

      const response = await fetch("http://localhost:4000/api/users/profile/reject", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
      })

      if (!response.ok) throw new Error ("Ceva nu a mers cum trebuie")
      const res = await response.json();
      getWorkersRejected()
      setMessage(res)
    }

    catch(err){
      if (err instanceof Error) setError({error: err.message})
    }
  }
  async function handleAcceptUser(id: string){
    try{

      const token = localStorage.getItem("token");

      if (!token) throw new Error ("Token lipsa")
      if (!id) throw new Error ("Nu puteti face aceste modificari");

      const response = await fetch("http://localhost:4000/api/users/profile/accept", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id})
      })

      if (!response.ok) throw new Error ("Ceva nu a mers cum trebuie")

      const res = await response.json();
      
      getWorkersApproved()
      setMessage(res);

    }
    catch(err){
      if (err instanceof Error) setError({error: err.message})
    }
  }
  
  
  
  async function countWorkers() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token lipsa");

      const response = await fetch (
        "http://localhost:4000/api/users/admin/profile/card/total_workers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          
        },
      );

      if (!response.ok) throw new Error("Ceva nu a mers cum trebuie");
      const data = await response.json();
      setTotalWorkers(Number(data[0].count));
      localStorage.setItem("initialValue", String(data[0].count));
    } catch (err) {
      if (err instanceof Error) setError({ error: err.message});
    }
  }

  async function calculateProcent() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token lipsa");

      const initialValue = localStorage.getItem("initialValue");

      const response = await fetch(
        "http://localhost:4000/api/users/admin/profile/card/total_workers",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ initialValue }),
        },
      );

      if (!response.ok) throw new Error("Ceva nu a mers cum trebuie");
      const data = await response.json();
      setProcent(Number(data));
    } catch (err) {
      if (err instanceof Error) setError({ error: err.message + "calculate" });
    }
  }

  async function countWorkersApproved() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token lipsa");

      const response = await fetch (
        "http://localhost:4000/api/users/admin/profile/card/total_workers/approved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          
        },
      );

      if (!response.ok) throw new Error("Ceva nu a mers cum trebuie");
      const data = await response.json();
      setApprovedWorkers(Number(data[0].count));
      localStorage.setItem("initialValueApproved", String(data[0].count));
    } catch (err) {
      if (err instanceof Error) setError({ error: err.message});
    }
  }

  async function calculateProcentApproved() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token lipsa");

      const initialValueApproved = localStorage.getItem("initialValueApproved");

      const response = await fetch(
        "http://localhost:4000/api/users/admin/profile/card/total_workers/approved",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ initialValueApproved }),
        },
      );

      if (!response.ok) throw new Error("Ceva nu a mers cum trebuie");
      const data = await response.json();
    
      setProcentApproved(Number(data));
    } catch (err) {
      if (err instanceof Error) setError({ error: err.message + "calculate" });
    }
  }

   async function countWorkersRejected() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token lipsa");

      const response = await fetch (
        "http://localhost:4000/api/users/admin/profile/card/total_workers/rejected",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          
        },
      );

      if (!response.ok) throw new Error("Ceva nu a mers cum trebuie");
      const data = await response.json();
      setRejectedWorkers(Number(data[0].count));
      localStorage.setItem("initialValueRejected", String(data[0].count));
    } catch (err) {
      if (err instanceof Error) setError({ error: err.message});
    }
  }

  async function calculateProcentRejected() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token lipsa");

      const initialValueRejected = localStorage.getItem("initialValueRejected");

      const response = await fetch(
        "http://localhost:4000/api/users/admin/profile/card/total_workers/rejected",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ initialValueRejected }),
        },
      );

      if (!response.ok) throw new Error("Ceva nu a mers cum trebuie");
      const data = await response.json();
      setProcentRejected(Number(data));
    } catch (err) {
      if (err instanceof Error) setError({ error: err.message + "calculate" });
    }
  }


  async function countWorkersPending() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token lipsa");

      const response = await fetch (
        "http://localhost:4000/api/users/admin/profile/card/total_workers/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          
        },
      );

      if (!response.ok) throw new Error("Ceva nu a mers cum trebuie");
      const data = await response.json();
      setPendingWorkers(Number(data[0].count));
      localStorage.setItem("initialValuePending", String(data[0].count));
    } catch (err) {
      if (err instanceof Error) setError({ error: err.message});
    }
  }

  async function calculateProcentPending() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token lipsa");

      const initialValuePending = localStorage.getItem("initialValuePending");

      if (Number(initialValuePending) <= 0) return

      const response = await fetch(
        "http://localhost:4000/api/users/admin/profile/card/total_workers/pending",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ initialValuePending }),
        },
      );

      if (!response.ok) throw new Error("Ceva nu a mers cum trebuie");
      const data = await response.json();
      setProcentPending(Number(data));
    } catch (err) {
      if (err instanceof Error) setError({ error: err.message + "calculate" });
    }
  }

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
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) return;

      const data = await response.json();
      console.log("Sunt in getPending " + data)
      setWorkers(data);
    } catch (err) {
      if (err instanceof Error) {
        setError({ error: err.message });
      }
    }
  }

  async function getWorkersRejected() {
    try {
      setWorkers([]);
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Token lipsa");

      const response = await fetch(
        "http://localhost:4000/api/users/worker/rejected",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Nici un rezultat");

      const data = await response.json();

      setWorkers(data);
    } catch (err) {
      if (err instanceof Error) setError({ error: err.message });
    }
  }

  async function getWorkerByCI_expiring() {
    try {
      setWorkers([]);
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Token lipsa");

      const response = await fetch(
        "http://localhost:4000/api/users/worker/by_expiring/ci",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Nici un rezultat");

      const data = await response.json();

      setWorkers(data);
    } catch (err) {
      if (err instanceof Error) setError({ error: err.message });
    }
  }

  async function getWorkersByEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setWorkers([]);
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Token lipsa");

      const response = await fetch(
        "http://localhost:4000/api/users/worker/by_email",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim() }),
        },
      );

      if (!response.ok) throw new Error("Nici un rezultat");

      const data = await response.json();
      
      setWorkers(data);
    } catch (err) {
      if (err instanceof Error) setError({ error: err.message });
    }
  }

  async function getWorkersApproved() {
    try {
      setWorkers([]);
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Token lipsa");

      const response = await fetch(
        "http://localhost:4000/api/users/worker/approved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Nici un rezultat");
      const data = await response.json();

      setWorkers(data);
    } catch (err) {
      if (err instanceof Error) setError({ error: err.message });
    }
  }

  return {
    error,
    workers,
    isStatus,
    email,
    totalWorkers,
    procent,
    procentApproved,
    approvedWorkers,
    rejectedWorkers,
    procentRejected,
    pendingdWorkers,
    procentPending,
    message,
    handleRejectUser,
    handleAcceptUser, 
    countWorkersPending,
    calculateProcentPending,
    countWorkersRejected,
    calculateProcentRejected,
    calculateProcentApproved,
    countWorkersApproved,
    countWorkers,
    calculateProcent,
    setEmail,
    getWorkerByCI_expiring,
    setIsStatus,
    getWorkersPending,
    getWorkersApproved,
    getWorkersRejected,
    getWorkersByEmail,
    getWorkers,
  };
}
