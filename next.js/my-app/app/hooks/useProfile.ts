"use client"

import type { Profile } from "@/app/lib/definitions"
import { useState } from "react"

export default function useProfile() {

    const [profile, setProfile] = useState<Profile>()
    const [error, setError] = useState("")

    async function getProfile(){
        try{
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Token lipsă");


            const response = await fetch("/api/admin/topbar", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) throw new Error ("A intervenit o eroare");

            const data = await response.json();

            setProfile(data)
        }

        catch(error){
            if (error instanceof Error) setError(error.message)
        }
    }
  
  
    return {
        profile,
        error,
        getProfile,
  }
}
