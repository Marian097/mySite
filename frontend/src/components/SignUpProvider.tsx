import type React from "react";
import type { User } from "../types/AuthTypes/User";
import type { Errors } from "../types/AuthTypes/Errors";
import type { Touched } from "../types/AuthTypes/Touched";
import type { ErrorsLogin } from "../types/AuthTypes/ErrorsLogin";
import Logo from "../assets/logo/Logo_v2.png";

type Props = {
  value: User;
  errors: Errors;
  touched: Touched;
  errorsLogin: ErrorsLogin;
  message: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  singUpProvider: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function FormSingUp({
  value,
  errors,
  touched,
  message,
  handleChange,
  handleBlur,
  singUpProvider,
}: Props) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        action=""
        className="bg-black/55 rounded-xl px-10 flex flex-col justify-center gap-2 py-5"
        onSubmit={singUpProvider}
      >
        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Your Company" src={Logo} className="mx-auto h-auto" />
            <h2 className="pb-8 text-center text-2xl/9 font-bold tracking-tight text-white">
              Creează un cont
            </h2>
          </div>
        </div>
        <div>
          <label htmlFor="name" className="text-white font-medium">
            Nume:
          </label>
          <input
            type="text"
            placeholder="Nume"
            name="name"
            className={
              touched.name && errors.name
                ? "border border-red-500 bg-red-100 rounded-md ml-2 w-1/2"
                : "border border-white rounded-md bg-white ml-2 w-1/2"
            }
            value={value.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name && (
            <p style={{ color: "red" }}>{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="text-white font-medium">
            Email:
          </label>
          <input
            type="email"
            placeholder="Adresa de email"
            name="email"
            className={
              errors.email && touched.email
                ? "border border-red-500  bg-red-100 rounded-md w-1/2 ml-3"
                : "border border-white rounded-md bg-white w-1/2 ml-3"
            }
            value={value.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {touched.email && errors.email && (
            <p style={{ color: "red" }}>{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="text-white font-medium">
            Parola:
          </label>
          <input
            type="password"
            placeholder="Parola"
            className={
              errors.password
                ? "border border-red-500  bg-red-100 rounded-md ml-1.5 w-1/2"
                : "border border-white rounded-md bg-white ml-1.5 w-1/2"
            }
            name="password"
            value={value.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <p style={{ color: "white" }}>{message}</p>
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
