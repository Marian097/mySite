import { useState } from "react";
import type { User } from "../types/User";
import * as yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";

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
  password: yup.string().required("Parola este obligatorie"),
});

export default function Hooks() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showRulePass, setShowRulePass] = useState<boolean>(false);
  const [showRuleFields, setShowRuleFields] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [isSingUp, setIsSingUp] = useState<boolean>(false);

  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/;

  async function sing_up() {
    const missingFields = !email || !password || !name || !phone;
    const invalidPassword = !passRegex.test(password);

    setShowRuleFields(missingFields);
    setShowRulePass(invalidPassword);

    if (missingFields || invalidPassword) return;

    const user: User = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };

    try {
      await userSchema.validate(user, {
        abortEarly: false,
      });

      await fetch("http://localhost:4000/api/client/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      console.log("Dupa fetch");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorsByField = Object.fromEntries(
          err.inner.map((e) => [e.path ?? "form", e.message]),
        );
        console.log("Erori:", errorsByField);

        console.log("esti in catch");
      } else {
        console.error(err);
        console.log("Esti in finally");
      }
    }
  }

  async function login() {
    try {
      const user = {
        email: email,
        password: password,
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
      console.log("Token salvat:", data.token);
    } catch (error) {
      console.error("Eroare la conectare: " + error);
    }
  }

  return {
    email,
    password,
    name,
    showRulePass,
    showRuleFields,
    isSingUp,
    phone,
    userSchema,
    setIsSingUp,
    setPhone,
    setEmail,
    setName,
    setPassword,
    sing_up,
    login,
  };
}
