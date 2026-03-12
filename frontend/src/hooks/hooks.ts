import { useState } from "react";
import type { User } from "../types/User";
import * as yup from "yup";

const userSchema = yup.object({
  name: yup.string(),
  email: yup.string().email(),
  password: yup.string(),
});

export default function Hooks() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showRulePass, setShowRulePass] = useState<boolean>(false);
  const [showRuleFields, setShowRuleFields] = useState<boolean>(false);
  const [isSingUp, setIsSingUp] = useState<boolean>(false);

  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  async function sing_up() {
    if (!email || !password || !name) setShowRuleFields(true);
  

    if (!passRegex.test(password)) setShowRulePass(true);
   

    if (!passRegex.test(password)) return;

    if (showRulePass && showRuleFields) return;

    const user: User = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const valid = await userSchema.validate(user, {
        abortEarly: false,
      });

      if (valid) {
        await fetch("http://localhost:4000/api/client/sing-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorsByField = Object.fromEntries(
          err.inner.map((e) => [e.path ?? "form", e.message]),
        );
        console.log("Erori:", errorsByField);
      } else {
        console.error(err);
      }
    }
  }

  async function login() {
     if (!email || !password) setShowRuleFields(true);
  

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
    setIsSingUp,
    setEmail,
    setName,
    setPassword,
    sing_up,
    login,
  };
}
