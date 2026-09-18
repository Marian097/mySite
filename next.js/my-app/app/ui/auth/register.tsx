"use client";
import Image from "next/image";
import logo from "@/public/Logo_v2.png";
import {useState} from "react"

export default function Register() {
  
  const [error, setError] = useState("")
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {

      const formData = new FormData(e.currentTarget);

      const response = await fetch("/api/auth", {
        method: "POST",
         headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
      })
      })

      const data = await response.json()

      console.log(data)
    } 
    
    catch (error) {
      if (error instanceof Error) setError(error.message) 
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        action=""
        className="bg-black/55 rounded-xl px-10 flex flex-col justify-center gap-2 py-5"
        onSubmit={handleSubmit}
      >
        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image src={logo} alt="Your Company" className="mx-auto h-auto" />
            <h2 className="pb-8 text-center text-2xl/9 font-bold tracking-tight text-white">
              Creează un cont
            </h2>
          </div>
        </div>
        <div>
          <label htmlFor="name" className="text-white font-medium">
            Nume:
          </label>
          <input type="text" placeholder="Nume" name="name" />
        </div>
        <div>
          <label htmlFor="email" className="text-white font-medium">
            Email:
          </label>
          <input type="email" placeholder="Adresa de email" name="email" />
        </div>
        <div>
          <label htmlFor="password" className="text-white font-medium">
            Parola:
          </label>
          <input type="password" name = "password" placeholder="Parola" />
        </div>
        <div>
          <p>{error}</p>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Creează un cont
        </button>
      </form>
    </div>
  );
}
