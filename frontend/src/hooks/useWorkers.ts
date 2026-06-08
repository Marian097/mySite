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
  const [procent, setProcent] = useState<number>();

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

      if (!response.ok) throw new Error("Nici un rezultat");

      const data = await response.json();
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
