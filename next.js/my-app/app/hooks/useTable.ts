"use client"

import { useState } from  "react"

import type { Table } from "@/app/lib/definitions";

export default function useTable() {

    const [workers, setWorkers] = useState<Table>()

    async function getWorkers(){
        try{

            const token = localStorage.getItem("token");

            if(!token) throw new Error("Token invalid");

            const response = await fetch("/api/admin/table", {
                headers: {
                    Authorizaton: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })

            if (!response.ok) throw new Error ("Eroare la încarcarea datelor");

            const  data = await response.json()
            setWorkers(data)

        }
        catch(error){
            if (error instanceof Error) console.log(error.message)
        }
    }
    return {
        workers,
        getWorkers
  }
}
