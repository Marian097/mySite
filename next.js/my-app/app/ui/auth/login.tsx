import React from "react";

import Image from "next/image";
import logo from "@/public/Logo_v2.png";
import {useState} from "react"

export default function Login() {

  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
      });

      if (!response.ok) throw new Error("Email sau parolă incorectă");

      const data = await response.json();

      localStorage.setItem("token", data.token);
    } catch (err) {
      if (err instanceof Error) setError(err.message)
    }
  }


  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        action=""
        className="bg-black/55 rounded-xl px-10 flex flex-col justify-center gap-2 py-5"
        onSubmit = {handleSubmit}
      >
        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image src={logo} className="mx-auto h-auto" alt="logo"></Image>
            <h2 className="pb-8 text-center text-2xl/9 font-bold tracking-tight text-white">
              Intră în cont
            </h2>
          </div>
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
          <input type="password" placeholder="Parola" name="password" />
        </div>
        <div className="text-sm py-3">
          <a
            href="#"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Ai uitat parola?
          </a>
        </div>
        <div>
          <p>{error}</p>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Intră în cont
          </button>
        </div>
      </form>
    </div>
  );
}
