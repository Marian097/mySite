import { useState, useEffect } from "react";
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

  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  useEffect(() => {
    if (!email || !password || !name) {
      setShowRuleFields(true);
    } else {
      setShowRuleFields(false);
    }

    if (!passRegex.test(password)) {
      setShowRulePass(true);
    } else {
      setShowRulePass(false);
    }
  }, [email, password, name]);

  async function sing_up() {
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

  return {
    email,
    password,
    name,
    setEmail,
    setName,
    setPassword,
    sing_up
  };
}
