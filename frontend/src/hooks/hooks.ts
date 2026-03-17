import { useState } from "react";
import type { User } from "../types/User";
import * as yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";
import type { Touched } from "../types/Touched";
import type { Errors } from "../types/Errors";

const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/;

export const userSchema = yup.object({
  name: yup.string().required("Numele este obligatoriu"),
  email: yup
    .string()
    .email("Email invalid")
    .required("Emailul este obligatoriu"),
  phone: yup
    .string()
    .required("Telefon obligatoriu")
    .test("phone", "Numar invalid", (value) =>
      value ? isValidPhoneNumber(value, "RO") : false,
    ),
  password: yup
    .string()
    .matches(passRegex, "Min 8 caractere, o literă mare, un simbol")
    .required("Parola este obligatorie"),
});

export default function useAuthForm() {
  const [values, setValues] = useState<User>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [touched, setTouched] = useState<Touched>({
    name: false,
    email: false,
    phone: false,
    password: false,
  });

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [isSignUp, setIsSignUp] = useState(false);

  // 🔹 CHANGE
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // 🔹 BLUR
  async function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    try {
      await userSchema.validateAt(name, values);

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors((prev) => ({
          ...prev,
          [name]: err.message,
        }));
      }
    }
  }

  // 🔹 SIGN UP
  async function signUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await userSchema.validate(values, { abortEarly: false });

      setErrors({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

      await fetch("http://localhost:4000/api/client/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Errors = {
          name: "",
          email: "",
          phone: "",
          password: "",
        };

        err.inner.forEach((error) => {
          const field = error.path as keyof Errors;

          if (field && !newErrors[field]) {
            newErrors[field] = error.message;
          }
        });

        setErrors(newErrors);

        setTouched({
          name: true,
          email: true,
          phone: true,
          password: true,
        });
      }
    }
  }

  // 🔹 LOGIN
  async function login() {
    try {
      const user = {
        email: values.email,
        password: values.password,
      };

      const response = await fetch("http://localhost:4000/api/client/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Eroare la login");
      }

      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Eroare la conectare:", error);
    }
  }


  return {
    values,
    errors,
    touched,
    isSignUp,
    setIsSignUp,
    handleChange,
    handleBlur,
    signUp,
    login,
  };
}