"use client"

import type { Count, Procent } from "@/app/lib/definitions";
import { useState } from "react";

export default function useCards() {
  const [error, setError] = useState("");

  const [countWorkers, setCountWorkers] = useState<Count>();

  const [procent, setProcent] = useState<Procent>();

  async function getTotalWorkers() {
    try {
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Token lipsă");

      const response = await fetch("/api/admin/cards", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error("A intervenit o eroare la incărcarea datelor");

      const data = await response.json();

      setCountWorkers(data);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  }

  async function calculateProcent() {
    try {
      const token = localStorage.getItem("token");

      if (!token) throw new Error("Token lipsă");

      const response = await fetch("/api/admin/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(countWorkers)
      });

      if (!response.ok) throw new Error("Datele nu au fost transmise");

      const data = await response.json();
      
      setProcent(data);

    } catch (error){
       if (error instanceof Error) setError(error.message);
    }
  }
  return {
    error,
    procent,
    countWorkers,
    calculateProcent,
    getTotalWorkers,
  };
}
